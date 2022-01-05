/* eslint-disable no-console */

const SUPABASE_URL = 'https://knhiasotugxozbbkbqrw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNzkzMywiZXhwIjoxOTU1MDgzOTMzfQ.EBPUcU_WWpLifNiYHK0-7lDB2fZtodlhB2Yb7rOSIek';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function fetchCity() {
    const response = await client
        .from('cities')
        .select()
        .match({ user_id: client.auth.user().id })
        .single();

    return checkError(response);
}

export async function createDefaultCity() {
    //create a new city with correct defaults for all properties(name, 3 drop-downs, slogan)
    const response = await client
        .from('cities')
        .insert([
            {
                name: 'Fairyland',
                waterfront_id: '1',
                skyline_id: '1',
                castle_id: '1',
                slogans: ['Everyone has a fairyland of his/her/their own!']
            }
        ])
        .single();
        
    return checkError(response);
}

export async function updateName(newName) {
    const user = await getUser();
    const response = await client
        //update the row in the cities table
        .from('cities')
        //update the row's name
        .update({ name: newName })
        //if the row's user id matches this logged-in user
        .match({ user_id: user.user.id })
        //and only do this to one thing. Do not return an array
        .single();
    //return the updated city
    return checkError(response);
}

export async function updateWaterfront(newWaterfront) {
    const user = await getUser();
     //update the water_id column for this city in the database 
    const response = await client
        .from('cities')
        .update({ waterfront_id: newWaterfront })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateSkyline(newSkyline) {
    const user = await getUser();
    const response = await client
        .from('cities')
        .update({ skyline_id: newSkyline })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateCastle(newCastle) {
    const user = await getUser();
    const response = await client
        .from('cities')
        .update({ castle_id: newCastle })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateSlogans(newSlogans) {
    const user = await getUser();
    const response = await client
        .from('cities')
        .update({ slogans: newSlogans })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}



export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
