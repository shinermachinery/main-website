"use client";

import * as React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ContentSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  slidesToScroll?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  navigationClassName?: string;
}

export function ContentSlider<T>({
  items,
  renderItem,
  itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  slidesToScroll = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  gap = 24,
  showNavigation = true,
  showDots = false,
  autoplay = false,
  autoplayDelay = 3000,
  className,
  navigationClassName,
}: ContentSliderProps<T>) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (!autoplay || !api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [api, autoplay, autoplayDelay]);

  // Track current viewport for responsive behavior
  const [currentItemsPerView, setCurrentItemsPerView] = React.useState(() => {
    if (typeof window === "undefined") return itemsPerView.desktop || 3;
    const width = window.innerWidth;
    if (width < 768) return itemsPerView.mobile || 1;
    if (width < 1024) return itemsPerView.tablet || 2;
    return itemsPerView.desktop || 3;
  });

  // Update items per view on resize
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentItemsPerView(itemsPerView.mobile || 1);
      } else if (width < 1024) {
        setCurrentItemsPerView(itemsPerView.tablet || 2);
      } else {
        setCurrentItemsPerView(itemsPerView.desktop || 3);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Get slides to scroll based on current viewport
  const getSlidesToScroll = () => {
    if (typeof window === "undefined") return slidesToScroll.desktop || 3;

    const width = window.innerWidth;
    if (width < 768) return slidesToScroll.mobile || 1;
    if (width < 1024) return slidesToScroll.tablet || 2;
    return slidesToScroll.desktop || 3;
  };

  // Calculate flex-basis accounting for gap
  const calculateFlexBasis = () => {
    const gapTotal = gap * (currentItemsPerView - 1);
    const gapPerItem = gapTotal / currentItemsPerView;
    return `calc(${100 / currentItemsPerView}% - ${gapPerItem}px)`;
  };

  return (
    <div className={className}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          slidesToScroll: getSlidesToScroll(),
          skipSnaps: false,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent
          style={{ gap: `${gap}px` }}
          className="ml-0 items-stretch"
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              style={{
                flexBasis: calculateFlexBasis(),
              }}
              className="!pl-0 flex"
            >
              <div className="w-full">{renderItem(item, index)}</div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {showNavigation && items.length > (itemsPerView.desktop || 3) && (
          <>
            <CarouselPrevious className={navigationClassName} />
            <CarouselNext className={navigationClassName} />
          </>
        )}
      </Carousel>

      {showDots && count > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === current - 1
                  ? "w-8 bg-gradient-to-r from-brand-blue to-brand-green"
                  : "w-2 bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
