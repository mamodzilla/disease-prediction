import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPostRegister {
    nickname: string;
    email: string;
    password: string
}

export const postRegister= async (data: IPostRegister) => {
      const response = await fetch('http://localhost:8010/register', 
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resp: Promise<any> = await response.json();
      return resp;
};