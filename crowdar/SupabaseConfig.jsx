import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://supabase.crowdar.pl/rest/v1/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNjk5OTE2NDAwLAogICJleHAiOiAxODU3NzY5MjAwCn0.1Y7y6FQJteUa_Bl7qWTa3dxef0k_lKgGQo_aaP89r_c';
const supabaseKey2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE2OTk5MTY0MDAsCiAgImV4cCI6IDE4NTc3NjkyMDAKfQ.NO4CPUC5rQY8Zv6qGHAXFUPzcTwTdhsQIwtZxxMIkgo';
export const supabase = createClient(supabaseUrl, supabaseKey);