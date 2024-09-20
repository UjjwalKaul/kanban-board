import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Login = () => {
  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Task Manager</CardTitle>
          <CardDescription>
            One-stop solution to help users organize, track, and manage tasks or
            activities efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col space-y-4">
              <Input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="email"
              />
              <Input
                autoComplete="current-password"
                type="password"
                id="password"
                placeholder="Password"
              />
              <Button className="text-xl">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
