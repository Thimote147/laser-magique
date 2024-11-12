
import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define booking item type
const ItemTypes = {
  BOOKING: "booking",
};

const hours = Array.from({ length: 14 }, (_, i) => i + 6); // 6 AM to 8 PM
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const sampleBookings = [
  { id: 1, name: "Booking 1", duration: 2, startHour: 10, day: 1, price: "748.58 €" },
  { id: 2, name: "Booking 2", duration: 1, startHour: 10, day: 1, price: "180.0 €" },
  // Add more bookings here with overlapping times for testing
];

interface Booking {
    id: number;
    name: string;
    duration: number;
    startHour: number;
    day: number;
    price: string;
}

const DayRes = () => {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);

const moveBooking = (id: number, newDay: number, newStartHour: number) => {
    setBookings((prev: Booking[]) =>
        prev.map((booking: Booking) =>
            booking.id === id
                ? { ...booking, day: newDay, startHour: newStartHour }
                : booking
        )
    );
};

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-8 gap-0 p-4">
        {/* Day Headers */}
        <div></div>
        {days.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}

        {/* Time Slots */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Hour Labels */}
            <div className="text-right pr-2">{hour}:00</div>
            {days.map((_, dayIndex) => (
              <TimeSlot
                key={dayIndex}
                hour={hour}
                day={dayIndex + 1}
                bookings={bookings.filter(
                  (booking) => booking.startHour === hour && booking.day === dayIndex + 1
                )}
                moveBooking={moveBooking}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </DndProvider>
  );
}

interface TimeSlotProps {
  hour: number;
  day: number;
  bookings: Booking[];
  moveBooking: (id: number, newDay: number, newStartHour: number) => void;
}

function TimeSlot({ hour, day, bookings, moveBooking }: TimeSlotProps) {
  const [, drop] = useDrop({
    accept: ItemTypes.BOOKING,
    drop: (item: { id: number }) => moveBooking(item.id, day, hour),
  });

  return (
    <div ref={drop} className="relative border p-2 h-20 flex space-x-1">
      {bookings.map((booking) => (
        <Booking key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

function Booking({ booking }: { booking: Booking }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOOKING,
    item: { id: booking.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 rounded ${isDragging ? "opacity-50" : "opacity-100"} bg-red-300 w-1/2`}
      style={{
        height: `${booking.duration * 5}rem`, // Adjust based on duration
      }}
    >
      <span className="block font-bold">{booking.name}</span>
      <span>{booking.price}</span>
    </div>
  );
}

export default DayRes;
