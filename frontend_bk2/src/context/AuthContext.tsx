import { type ReactNode, createContext, useContext, useState } from 'react';

type UserType = { role: string; email: string };

export const AuthContext = createContext<{
  user: UserType | null;
  login: (token: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

const login = (token: string) => {
  // Placeholder for actual token decoding logic
  console.log('Received token:', token);
  setUser({ role: 'ADMIN', email: 'admin@example.com' });
};


  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

