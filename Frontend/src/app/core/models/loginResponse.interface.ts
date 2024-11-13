export interface LoginResponseInterface {
    data:      UserWithToken; 
    isSuccess: boolean;
    message:   string | null; 
}

export interface UserWithToken {
    id: number;
    name: string;
    email: string;
    username: string;
    token: string;
}

