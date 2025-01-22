import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import { Booking } from "../../types";
import { Button } from "../../components/ui/Button";
import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import { supabase } from "../../supabase/client";

interface BookingDetailsModificationsProps {
    infos: Booking | undefined;
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingDetailsModifications = ({ infos, update, setUpdate }: BookingDetailsModificationsProps) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [new_firstname, setFirstname] = useState(infos?.firstname);
    const [new_lastname, setLastname] = useState(infos?.lastname);
    const [new_phone, setPhone] = useState(infos?.phone);
    const [new_email, setEmail] = useState(infos?.email);
    const [new_date, setDate] = useState(infos?.date);
    const [new_nbr_pers, setNbrPers] = useState(infos?.nbr_pers);
    const [new_nbr_parties, setNbrParties] = useState(infos?.nbr_parties);
    const [new_deposit, setDeposit] = useState(infos?.deposit);
    const [new_comment, setComment] = useState(infos?.comment);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await supabase.rpc('update_booking', { actual_booking_id: infos?.booking_id, new_firstname, new_lastname, new_phone, new_email, new_date, new_nbr_pers, new_nbr_parties, new_deposit, new_comment });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setUpdate(!update);
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, backgroundColor: 'background.form' }}>
            <Paper elevation={3} sx={{ mt: { xs: 4, sm: 8 }, p: { xs: 3, sm: 4 } }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <Typography component="h1" variant="h5" gutterBottom>
                        Modifier les informations
                    </Typography>

                    <Input
                        label="Prénom"
                        type="text"
                        defaultValue={infos?.firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />

                    <Input
                        label="Nom"
                        type="text"
                        defaultValue={infos?.lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />

                    <Input
                        label="Phone"
                        type="tel"
                        defaultValue={infos?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Input
                        label="Email"
                        type="email"
                        defaultValue={infos?.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Date"
                        type="datetime-local"
                        defaultValue={infos?.date}
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                            setDate(localDate);
                        }}
                        required
                    />

                    <Input
                        label="Nombre de personnes"
                        type="number"
                        defaultValue={infos?.nbr_pers}
                        onChange={(e) => setNbrPers(parseInt(e.target.value))}
                        inputProps={{ min: 2, max: 20 }}
                    />

                    <Input
                        label="Nombre de parties"
                        type="number"
                        defaultValue={infos?.nbr_parties}
                        onChange={(e) => setNbrParties(parseInt(e.target.value))}
                        inputProps={{ min: 1 }}
                    />

                    <Input
                        label="Acompte"
                        type="number"
                        defaultValue={infos?.deposit}
                        onChange={(e) => setDeposit(parseInt(e.target.value))}
                        inputProps={{ min: 0 }}
                    />

                    <Input
                        label="Commentaire"
                        type="text"
                        defaultValue={infos?.comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? 'Mise à jour...' : 'Mettre à jour'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default BookingDetailsModifications;