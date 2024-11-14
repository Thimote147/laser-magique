import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import gridCols from "./gridCols";

const ItemTypes = {
	BOOKING: "booking",
};

const hours = Array.from({ length: 14 }, (_, i) => i + 9); // 9h à 22h

interface Booking {
	reservation_id: number;
	firstname: string;
	lastname: string;
	nbr_pers: number;
	group_type: string;
	date: string;
	duration: number;
	price: number;
}

const Calendar = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [startDate, setStartDate] = useState(new Date());

	useEffect(() => {
		const sampleBookings = [
			{ reservation_id: 1, firstname: "Thimoté", lastname: "Fétu", nbr_pers: 4, group_type: "Groupe", date: "2024-11-13T17:00", duration: 1, price: 140.0 },
			{ reservation_id: 2, firstname: "Joëlle", lastname: "Pichel", nbr_pers: 2, group_type: "Groupe", date: "2024-11-13T14:00", duration: 2, price: 60.0 },
			{ reservation_id: 3, firstname: "Raphaël", lastname: "Fétu", nbr_pers: 7, group_type: "Formule Anniversaire", date: "2024-11-13T17:00", duration: 2, price: 90.0 },
			{ reservation_id: 4, firstname: "Elodie", lastname: "Vincx", nbr_pers: 4, group_type: "Groupe", date: "2024-11-13T19:00", duration: 1, price: 220.0 },
			{ reservation_id: 5, firstname: "Arthur", lastname: "Lonfils", nbr_pers: 12, group_type: "Groupe", date: "2024-11-13T10:00", duration: 2, price: 560.0 },
		];
		setBookings(sampleBookings);
	}, []);

	const changeWeek = (offset: number) => {
		const newStartDate = new Date(startDate);
		newStartDate.setDate(startDate.getDate() + offset * 7);
		setStartDate(newStartDate);
	};

	const moveBooking = (id: number, newDay: number, newStartHour: number) => {
		setBookings((prev: Booking[]) =>
			prev.map((booking: Booking) =>
				booking.reservation_id === id
					? { ...booking, date: new Date(startDate).setDate(newStartHour).toString() }
					: booking
			)
		);
	};

	// Obtenir les dates de la semaine, en commençant par le lundi
	const getWeekDates = (startDate: Date) => {
		const date = new Date(startDate);
		const day = date.getDay();
		const diff = day === 0 ? -6 : 1 - day;
		date.setDate(date.getDate() + diff);
		return Array.from({ length: 7 }, (_, i) => {
			const d = new Date(date);
			d.setDate(date.getDate() + i);
			return d;
		});
	};

	const weekDates = getWeekDates(startDate);
	const today = new Date();

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="p-4">
				{/* Navigation de la semaine */}
				<div className="flex justify-between items-center mb-4">
					<button onClick={() => changeWeek(-1)}>&lt; Semaine précédente</button>
					<span className="font-bold">
						Semaine du {weekDates[0].toLocaleDateString()} au {weekDates[6].toLocaleDateString()}
					</span>
					<button onClick={() => changeWeek(1)}>Semaine suivante &gt;</button>
				</div>

				<div className={`grid ${gridCols(8)} gap-0`} style={{ height: "650px", overflow: "auto" }}>
					{/* En-têtes des jours avec dates */}
					<div></div>
					{weekDates.map((date, index) => (
						<div key={index} className="text-center font-bold">
							{date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "numeric" })}
						</div>
					))}

					{/* Créneaux horaires */}
					{hours.map((hour) => (
						<React.Fragment key={hour}>
							{/* Étiquettes des heures */}
							<div className="text-right pr-2 ml-auto">
								{hour}:00
							</div>
							{weekDates.map((date, dayIndex) => {
								const isCurrentHour = today.toDateString() === date.toDateString() && today.getHours() === hour;
								const timeSlotBookings = bookings.filter((booking) => {
									const bookingDate = new Date(booking.date);
									return bookingDate.getDate() === date.getDate() && bookingDate.getHours() === hour;
								});
								return (
									<TimeSlot
										key={dayIndex}
										hour={hour}
										day={dayIndex + 1}
										bookings={timeSlotBookings}
										moveBooking={moveBooking}
										isCurrentHour={isCurrentHour}
									/>
								);
							})}
						</React.Fragment>
					))}
				</div>
			</div>
		</DndProvider>
	);
};

interface TimeSlotProps {
	hour: number;
	day: number;
	bookings: Booking[];
	moveBooking: (id: number, newDay: number, newStartHour: number) => void;
	isCurrentHour: boolean;
}

function TimeSlot({ hour, day, bookings, moveBooking, isCurrentHour }: TimeSlotProps) {
	const [, drop] = useDrop({
		accept: ItemTypes.BOOKING,
		drop: (item: { id: number }) => moveBooking(item.id, day, hour),
	});

	// Déterminer la largeur de chaque réservation en fonction du nombre de réservations présentes
	const bookingWidth = `${90 / (bookings.length || 1)}%`;

	// Calculer la position gauche en fonction de l'index de la réservation dans un créneau horaire
	return (
		<div
			ref={drop}
			className={`relative border p-2 ${isCurrentHour ? "bg-yellow-100" : ""}`}
			style={{ height: "90px", width: "150px", position: "relative" }}
		>
			{bookings.map((booking, index) => (
				<Booking
					key={booking.reservation_id}
					booking={booking}
					width={bookingWidth}
					left={`${(90 / bookings.length) * index}%`} // Positionner chaque réservation côte à côte
				/>
			))}
		</div>
	);
}

function Booking({ booking, width, left }: { booking: Booking; width: string; left: string }) {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.BOOKING,
		item: { id: booking.reservation_id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	// Calculer la hauteur de la réservation en fonction de sa durée
	const bookingHeight = `${booking.duration * 88}px`;

	return (
		<div
			ref={drag}
			className={`absolute p-2 rounded ${isDragging ? "opacity-50" : "opacity-100"} bg-red-300`}
			style={{
				width: width, // Ajustement de la largeur de la réservation
				height: bookingHeight, // Ajustement de la hauteur en fonction de la durée
				top: 0,
				left: left, // Positionner horizontalement chaque réservation
			}}
		>
			<span className="block font-bold">{booking.firstname} {booking.lastname}</span>
			<span>{booking.price} €</span>
		</div>
	);
}

export default Calendar;
