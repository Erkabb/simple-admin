'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {useAddUserMutation} from "@/gql/auth/add-user/adduser.generated";

interface AddUserType {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<AddUserType>({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
const [addUserMutation] = useAddUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
    await addUserMutation({
      variables: {
        input: {
          firstname: profile.firstname,
          lastname: profile.lastname,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          password: profile.password,
        }
      }
    })
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">FirstName</Label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            value={profile.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">LastName</Label>
          <input
              id="lastname"
              name="lastname"
              type="text"
              value={profile.lastname}
              onChange={handleChange}
              required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            onChange={handleChange}
            value={profile.phoneNumber}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <input
              id="password"
              type="text"
              name="password"
              onChange={handleChange}
              value={profile.password}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Succesfully registered.'}
        </Button>
      </form>
    </div>
  );
}
