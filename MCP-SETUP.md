# MCP Server Setup Guide

This document explains how to configure and use Model Context Protocol (MCP) servers with this project.

## What is MCP?

Model Context Protocol (MCP) is a protocol that allows Claude Code to connect to external tools and services. MCP servers provide additional capabilities like accessing Figma designs, databases, or other external systems.

## Current Configuration

### Figma MCP Server

**Status**: Configured
**URL**: `http://127.0.0.1:3845/mcp`
**Purpose**: Access and interact with Figma design files

## Configuration Files

### `.mcp.json`

This file defines all available MCP servers for the project.

```json
{
  "mcpServers": {
    "figma": {
      "url": "http://127.0.0.1:3845/mcp",
      "description": "Figma MCP server for design file access"
    }
  }
}
```

### `.claude/settings.local.json`

This file enables MCP servers for Claude Code CLI.

```json
{
  "enableAllProjectMcpServers": true
}
```

Setting `enableAllProjectMcpServers: true` automatically approves all MCP servers defined in `.mcp.json`.

## How to Use Figma MCP

### Prerequisites

1. **Install Figma MCP Server**: You need the Figma MCP server running locally
2. **Start the Server**: Run the Figma MCP server on port 3845 (or your configured port)
3. **Verify Connection**: Ensure `http://127.0.0.1:3845/mcp` is accessible

### Usage with Claude Code

Once configured, Claude Code can:
- Access Figma design files
- Read component information
- Extract design tokens
- Get layer details
- And more (depending on your Figma MCP server capabilities)

**Example prompts:**
```
"Show me the components from the Figma file"
"Extract the color palette from the design"
"What are the spacing values in the design system?"
```

## Changing the Figma MCP Port

If your Figma MCP server runs on a different port:

1. Open `.mcp.json`
2. Update the URL:
   ```json
   {
     "mcpServers": {
       "figma": {
         "url": "http://127.0.0.1:YOUR_PORT/mcp",
         "description": "Figma MCP server for design file access"
       }
     }
   }
   ```
3. Restart Claude Code CLI

## Adding Additional MCP Servers

To add more MCP servers:

1. **Edit `.mcp.json`**:
   ```json
   {
     "mcpServers": {
       "figma": {
         "url": "http://127.0.0.1:3845/mcp",
         "description": "Figma MCP server"
       },
       "database": {
         "url": "http://127.0.0.1:4000/mcp",
         "description": "Database MCP server"
       },
       "custom-tool": {
         "url": "http://127.0.0.1:5000/mcp",
         "description": "Custom tool integration"
       }
     }
   }
   ```

2. **No changes needed to settings** - `enableAllProjectMcpServers: true` will enable all servers

3. **Restart Claude Code CLI**

## Selective MCP Server Enablement

If you want to enable only specific MCP servers instead of all:

1. **Remove** `enableAllProjectMcpServers: true` from `.claude/settings.local.json`

2. **Add** `enabledMcpjsonServers` array:
   ```json
   {
     "enabledMcpjsonServers": ["figma", "database"]
   }
   ```

This will enable only the `figma` and `database` MCP servers.

## Disabling MCP Servers

To disable specific servers:

```json
{
  "disabledMcpjsonServers": ["figma"]
}
```

Or remove `enableAllProjectMcpServers` to disable all by default.

## Troubleshooting

### MCP Server Not Connecting

**Problem**: Claude Code can't connect to MCP server
**Solutions**:
1. Verify the MCP server is running: `curl http://127.0.0.1:3845/mcp`
2. Check the port number in `.mcp.json` matches your server
3. Ensure no firewall is blocking the connection
4. Restart Claude Code CLI

### MCP Server Not Appearing

**Problem**: MCP server doesn't appear in Claude Code
**Solutions**:
1. Verify `.mcp.json` syntax is valid (use a JSON validator)
2. Check `.claude/settings.local.json` has `enableAllProjectMcpServers: true`
3. Restart Claude Code CLI
4. Check Claude Code CLI logs for errors

### Port Already in Use

**Problem**: Figma MCP server can't start because port 3845 is in use
**Solutions**:
1. Find what's using the port:
   - Windows: `netstat -ano | findstr :3845`
   - Mac/Linux: `lsof -i :3845`
2. Stop the conflicting process or choose a different port
3. Update `.mcp.json` with the new port

## Security Considerations

- **Local Only**: MCP servers configured here use `127.0.0.1` (localhost only)
- **No Public Access**: These servers are not accessible from the internet
- **Project Specific**: Configuration is scoped to this project
- **Version Control**: `.mcp.json` is committed to help team members

**Important**: Never expose MCP servers to the public internet without proper authentication and security measures.

## Team Collaboration

### For Team Members

If you're cloning this project:

1. **Install Figma MCP Server**: Follow your team's setup guide
2. **Start the server**: Run on port 3845 (default)
3. **No configuration needed**: `.mcp.json` is already set up
4. **Start using**: Claude Code will automatically connect

### Custom Port Configuration

If team members use different ports:

1. **Copy example**: `cp .mcp.json.example .mcp.json`
2. **Edit locally**: Change the port in your local `.mcp.json`
3. **Don't commit**: Keep your custom port configuration local

Alternatively, use environment variables if your MCP server supports them.

## Example Use Cases

### Design System Extraction
```
User: "Extract all color variables from the Figma design"
Claude: [Uses Figma MCP to read design file and extract colors]
```

### Component Analysis
```
User: "Show me all button variants in the design system"
Claude: [Uses Figma MCP to list button components and their properties]
```

### Design Token Generation
```
User: "Generate Tailwind config from the Figma design tokens"
Claude: [Uses Figma MCP to read tokens and generates tailwind.config.js]
```

## Additional Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://github.com/anthropics/claude-code)
- [Figma MCP Server](https://github.com/figma/mcp-server) (example link)

## Version History

- **2025-12-23**: Initial MCP configuration with Figma server

---

**Last Updated**: 2025-12-23
**Maintained By**: Development Team
