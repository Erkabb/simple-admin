// 'use client';
//
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';
//
// interface UserProfile {
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   position: string;
// }
//
// export default function ProfilePage() {
//   const [profile, setProfile] = useState<UserProfile>({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     position: '',
//   });
//
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//
//     try {
//       // TODO: Implement API call to update user profile
//       // const response = await fetch('/api/profile', {
//       //   method: 'PUT',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(profile),
//       // });
//
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Failed to update profile');
//       console.error('Error updating profile:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
//
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="name">Full Name</Label>
//           <Input
//             id="name"
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//             placeholder="John Doe"
//             required
//           />
//         </div>
//
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={profile.email}
//             onChange={handleChange}
//             placeholder="john@example.com"
//             required
//           />
//         </div>
//
//         <div className="space-y-2">
//           <Label htmlFor="phone">Phone Number</Label>
//           <Input
//             id="phone"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//             placeholder="+1 (555) 000-0000"
//           />
//         </div>
//
//         <div className="space-y-2">
//           <Label htmlFor="company">Company</Label>
//           <Input
//             id="company"
//             name="company"
//             value={profile.company}
//             onChange={handleChange}
//             placeholder="Company Name"
//           />
//         </div>
//
//         <div className="space-y-2">
//           <Label htmlFor="position">Position</Label>
//           <Input
//             id="position"
//             name="position"
//             value={profile.position}
//             onChange={handleChange}
//             placeholder="Job Title"
//           />
//         </div>
//
//         <Button
//           type="submit"
//           className="w-full"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Updating...' : 'Update Profile'}
//         </Button>
//       </form>
//     </div>
//   );
// }
