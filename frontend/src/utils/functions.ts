function toCapitalize(str: string) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const toMinutes = (date: string) => {
    if (!date) return 0;
    const [hours, minutes] = date.split(':').map(Number);
    return hours * 60 + minutes;
};

const toHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
};

const toCurrency = (hours: string, hourlyRate: number) => {
    const [hoursWorked, minutesWorked] = hours.split('h').map(Number);
    const total = hoursWorked * hourlyRate + (minutesWorked / 60) * hourlyRate;
    return total.toFixed(2);
}


export { toCapitalize, toMinutes, toHours, toCurrency };