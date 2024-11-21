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
	

	// Remplacez l'initialisation par des données locales par un appel à l'API
	useEffect(() => {
		fetch('https://api.thimotefetu.fr/reservations/today') // Remplacez par l'URL de votre API
			.then(response => {
				if (!response.ok) {
					throw new Error('Erreur réseau lors de la récupération des réservations');
				}
				return response.json();
			})
			.then(data => {
				const fetchedBookings = data.map((reservation: {
					reservation_id: number, firstname: string, lastname: string | null, nbr_pers: number, group_type: string; date: string; duration: number, price: number
				}) => ({
					reservation_id: reservation.reservation_id,
					firstname: reservation.firstname,
					lastname: reservation.lastname,
					nbr_pers: reservation.nbr_pers,
					group_type: reservation.group_type,
					date: reservation.date,
					duration: reservation.duration,
					price: reservation.price
				}));
				setBookings(fetchedBookings);
			})
			.catch(error => console.error('Erreur:', error));
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
					{weekDates.map((date, index) => {
						const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
						return (
							<div key={index} className={`text-center font-bold rounded m-2 ${isToday ? "bg-red-500" : ""}`}>
								{date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "numeric" })}
							</div>
						);
					})}

					{/* Créneaux horaires */}
					{hours.map((hour) => (
						<React.Fragment key={hour}>
							{/* Étiquettes des heures */}
							<div className="text-right pr-2 ml-auto">
								{hour}:00
							</div>
							{weekDates.map((date, dayIndex) => {
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
}

function TimeSlot({ hour, day, bookings, moveBooking }: TimeSlotProps) {
	const [, drop] = useDrop({
		accept: ItemTypes.BOOKING,
		drop: (item: { id: number }) => moveBooking(item.id, day, hour),
	});

	const bookingWidth = `${90 / (bookings.length || 1)}%`;

	return (
		<div
			ref={drop}
			className={`relative border p-2`}
			style={{ height: "90px", width: "150px", position: "relative" }}
		>
			{bookings.map((booking, index) => (
				<Booking
					key={booking.reservation_id}
					booking={booking}
					width={bookingWidth}
					left={`${(90 / bookings.length) * index}%`}
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

	const bookingHeight = `${booking.duration * 88}px`;
	
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			ref={drag}
			className={`absolute p-2 rounded ${isDragging ? "opacity-50" : "opacity-100"} shadow-lg border border-black bg-red-300`}
			style={{
				width: isHovered ? "100%" : width,
				height: bookingHeight,
				top: 0,
				left: isHovered ? 0 : left,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<span className="block font-bold">{booking.firstname} {booking.lastname}</span>
			<span>{booking.price} €</span>
		</div>
	);
}

export default Calendar;
