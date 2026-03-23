import { EventCard } from "@/components/cards/event-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEvents } from "@/sanity/lib/actions";

export async function EventsSection() {
  const events = await getEvents(8);

  if (events.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header */}
      <SectionHeading
        as="h1"
        title="Some of Our Events"
        description="Showcasing our presence at industry exhibitions and food processing trade shows across India."
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} images={event.images} title={event.title} />
        ))}
      </div>
    </section>
  );
}
