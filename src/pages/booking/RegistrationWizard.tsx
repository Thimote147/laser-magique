// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Stepper, Step, StepLabel, Paper, Alert, StepContent } from '@mui/material';
// import { Building2, CalendarDays, User } from 'lucide-react';
// import { Button } from '../../components/ui/Button';
// import RegisterForm from '../../components/auth/RegisterForm';

// interface WizardStep {
//   question: string;
//   description: string;
//   options: {
//     label: string;
//     value: string;
//     description: string;
//   }[];
// }

// const roleSteps: WizardStep[] = [
//   {
//     question: "Do you create or organize exhibitions?",
//     description: "Choose this if you host exhibitions. As an organizer you will:\n\n- Create and manage your own exhibitions\n- Review and approve exhibitor applications\n- Manage exhibition details, capacity and visitor registrations\n\nIMPORTANT: As an organizer, you CANNOT:\n- Participate as an exhibitor in any exhibitions\n- Register as a visitor for exhibitions\n\nSelect this ONLY if you host exhibitions, not if you want to exhibit or visit them.",
//     options: [
//       { 
//         label: "Yes, I organize exhibitions", 
//         value: "organizer",
//         description: "Select if you host exhibitions and manage them"
//       },
//       { 
//         label: "No, I want to participate in exhibitions", 
//         value: "continue",
//         description: "Select if you want to exhibit your business or visit exhibitions"
//       }
//     ]
//   },
//   {
//     question: "Are you part of a company or an independent professional?",
//     description: "Choose based on your professional status:\n\nProfessional:\n- Can participate as an exhibitor\n- Can register as a visitor\n- Access to company management features\n\nIndividual:\n- Can only register as a visitor\n- Access limited to exhibitions open to general public",
//     options: [
//       { 
//         label: "Yes, I'm a professional", 
//         value: "professional",
//         description: "Select if you represent a company or are an independent professional"
//       },
//       { 
//         label: "No, I'm an individual", 
//         value: "person",
//         description: "Select if you're attending exhibitions as an individual"
//       }
//     ]
//   }
// ];

// export const RegistrationWizard = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [selectedRole, setSelectedRole] = useState<string | null>(null);
//   const [previousSelections, setPreviousSelections] = useState<string[]>([]);
//   const navigate = useNavigate();

//   const handleOptionSelect = (value: string) => {
//     if (activeStep === 0) {
//       if (value === 'organizer') {
//         setSelectedRole('organizer');
//         setPreviousSelections([value]);
//         setActiveStep(2);
//       } else {
//         setPreviousSelections([value]);
//         setActiveStep(1);
//       }
//     } else {
//       setSelectedRole(value);
//       setPreviousSelections(prev => [...prev, value]);
//       setActiveStep(2);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep === 2) {
//       // If coming back from the registration form
//       if (previousSelections[0] === 'organizer') {
//         // If organizer, go back to first step
//         setActiveStep(0);
//         setSelectedRole(null);
//         setPreviousSelections([]);
//       } else {
//         // If not organizer, go back to professional status step
//         setActiveStep(1);
//         setSelectedRole(null);
//         setPreviousSelections(prev => prev.slice(0, -1));
//       }
//     } else if (activeStep === 1) {
//       // Going back to first step
//       setActiveStep(0);
//       setSelectedRole(null);
//       setPreviousSelections([]);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         <Step>
//           <StepLabel>Role Selection</StepLabel>
//           <StepContent>
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom>
//                 {roleSteps[0].question}
//               </Typography>
//               <Alert severity="info" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
//                 {roleSteps[0].description}
//               </Alert>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               {roleSteps[0].options.map((option) => (
//                 <Paper
//                   key={option.value}
//                   sx={{
//                     p: { xs: 2, sm: 3 },
//                     cursor: 'pointer',
//                     transition: 'all 0.2s',
//                     border: '2px solid',
//                     borderColor: 'transparent',
//                     '&:hover': {
//                       borderColor: 'primary.main',
//                       transform: 'translateY(-2px)',
//                     },
//                   }}
//                   onClick={() => handleOptionSelect(option.value)}
//                 >
//                   <Box sx={{ 
//                     display: 'flex', 
//                     flexDirection: { xs: 'column', sm: 'row' },
//                     alignItems: { xs: 'flex-start', sm: 'center' }, 
//                     gap: { xs: 1, sm: 2 }, 
//                     mb: 1 
//                   }}>
//                     {option.value === 'organizer' ? (
//                       <CalendarDays size={24} />
//                     ) : (
//                       <User size={24} />
//                     )}
//                     <Typography variant="h6">{option.label}</Typography>
//                   </Box>
//                   <Typography color="text.secondary">
//                     {option.description}
//                   </Typography>
//                 </Paper>
//               ))}
//             </Box>
//           </StepContent>
//         </Step>

//         <Step>
//           <StepLabel>Professional Status</StepLabel>
//           <StepContent>
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom>
//                 {roleSteps[1].question}
//               </Typography>
//               <Alert severity="info" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
//                 {roleSteps[1].description}
//               </Alert>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               {roleSteps[1].options.map((option) => (
//                 <Paper
//                   key={option.value}
//                   sx={{
//                     p: 3,
//                     cursor: 'pointer',
//                     transition: 'all 0.2s',
//                     border: '2px solid',
//                     borderColor: 'transparent',
//                     '&:hover': {
//                       borderColor: 'primary.main',
//                       transform: 'translateY(-2px)',
//                     },
//                   }}
//                   onClick={() => handleOptionSelect(option.value)}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                     {option.value === 'professional' ? (
//                       <Building2 size={24} />
//                     ) : (
//                       <User size={24} />
//                     )}
//                     <Typography variant="h6">{option.label}</Typography>
//                   </Box>
//                   <Typography color="text.secondary">
//                     {option.description}
//                   </Typography>
//                 </Paper>
//               ))}
//             </Box>

//             <Box sx={{ mt: 3 }}>
//               <Button onClick={handleBack}>
//                 Back
//               </Button>
//             </Box>
//           </StepContent>
//         </Step>

//         <Step>
//           <StepLabel>Account Details</StepLabel>
//           <StepContent>
//             <Box>
//               {selectedRole && (
//                 <>
//                   <Box sx={{ mb: 3 }}>
//                     <Button onClick={handleBack} variant="outlined">
//                       Back to {previousSelections[0] === 'organizer' ? 'Role Selection' : 'Professional Status'}
//                     </Button>
//                   </Box>
//                   <RegisterForm initialRole={selectedRole} />
//                 </>
//               )}
//             </Box>
//           </StepContent>
//         </Step>
//       </Stepper>
//     </Box>
//   );
// };