import { EventCard } from "@/components/cards/event-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getEvents } from "@/sanity/lib/actions";

export async function EventsSection() {
  const events = await getEvents(8);

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h1 className="text-4xl font-medium leading-[3rem] text-foreground tracking-[-0.0563rem]">
          Some of Our Events
        </h1>
        <p className="text-xl leading-7 text-muted-foreground tracking-[-0.0313rem]">
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {events.length === 0 ? (
        <EmptyState
          size="sm"
          message="No events to display at this time."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.map((event) => (
            <EventCard key={event.id} image={event.image} title={event.title} />
          ))}
        </div>
      )}
    </section>
  );
}
