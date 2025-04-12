
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences</p>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border/50">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive emails about your projects</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border/50">
          <h2 className="text-xl font-semibold mb-4">API Integrations</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">GitHub Integration</p>
                <p className="text-sm text-muted-foreground">Connect to your GitHub account</p>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Vercel Integration</p>
                <p className="text-sm text-muted-foreground">Connect to your Vercel account</p>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
