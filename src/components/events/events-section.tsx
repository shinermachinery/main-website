import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { EventCard } from "@/components/cards/event-card";
import { dummyEvents } from "@/data/fallback/events";

interface Event {
  id: string | number;
  image: string;
  title: string;
}

async function getEvents() {
  try {
    const events = await client.fetch(
      `*[_type == "event"] | order(order asc, _createdAt desc) {
        _id,
        title,
        image
      }[0...8]`,
    );

    if (!events || events.length === 0) {
      return dummyEvents;
    }

    return events.map((event: { _id: string; image?: any; title: string }) => ({
      id: event._id,
      image: event.image ? urlFor(event.image).url() : dummyEvents[0].image,
      title: event.title,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return dummyEvents;
  }
}

export async function EventsSection() {
  const events = await getEvents();
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

      {/* Events Grid - 2 columns, 4 rows */}
      <div className="flex flex-col gap-10">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.slice(0, 2).map((event: Event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.slice(2, 4).map((event: Event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.slice(4, 6).map((event: Event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.slice(6, 8).map((event: Event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
