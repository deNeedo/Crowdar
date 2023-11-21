import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({
    session: null,
    setSession: () => {}
});

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const currentSession = supabase.auth.getSession();
        setSession(currentSession);

        const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

//     useEffect(() => {
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             setSession(session);
//         });
//         supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session);
//         });
//     }, []);
