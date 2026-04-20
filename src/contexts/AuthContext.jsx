import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserRole(data.role);
      setUserData(data);
      return data;
    }
    throw new Error('User profile not found in database.');
  }

  async function logout() {
    await signOut(auth);
    setUserRole(null);
    setUserData(null);
  }

  // Demo login — bypasses Firebase Auth for demo/development
  function demoLogin(role) {
    const demoUsers = {
      admin: {
        uid: 'demo-admin-001',
        email: 'admin@school.com',
        role: 'admin',
        name: 'Dr. Rajesh Kumar',
        avatar: null,
      },
      teacher: {
        uid: 'demo-teacher-001',
        email: 'teacher@school.com',
        role: 'teacher',
        name: 'Prof. Anita Sharma',
        avatar: null,
        assignedClasses: ['10-A', '10-B'],
        subjects: ['Mathematics', 'Physics'],
      },
      student: {
        uid: 'demo-student-001',
        email: 'student@school.com',
        role: 'student',
        name: 'Amit Patel',
        avatar: null,
        class: '10-A',
        rollNo: '1001',
      },
    };
    const user = demoUsers[role];
    setCurrentUser(user);
    setUserRole(user.role);
    setUserData(user);
    localStorage.setItem('demoUser', JSON.stringify(user));
    return user;
  }

  function demoLogout() {
    setCurrentUser(null);
    setUserRole(null);
    setUserData(null);
    localStorage.removeItem('demoUser');
  }

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      const user = JSON.parse(demoUser);
      setCurrentUser(user);
      setUserRole(user.role);
      setUserData(user);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCurrentUser(user);
            setUserRole(data.role);
            setUserData(data);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userData,
    loading,
    login,
    logout,
    demoLogin,
    demoLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
