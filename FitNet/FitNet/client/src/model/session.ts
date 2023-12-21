import { reactive } from "vue";
import { useRouter } from "vue-router";
import { type User } from "./users";
import * as myFetch from "./myFetch";



const session = reactive({
  user: null as User | null,
  token: null as string | null,
  redirectUrl: null as string | null,
})

export function getSession(){
  return session;
}

export function api(action: string, body?: unknown, method?: string){
  return myFetch.api(`${action}`, body, method)
    .catch(err=> showError(err))
}
export function showError(err: any){
  console.error(err);
  alert(err.message || err);
}
//this api is specifically for update functions
export function api2(action: string, body?: unknown, method?: string){
  return myFetch.apiPut(`${action}`, body, method)
    .catch(err=> showError(err))
}

export function useLogin(){
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise< User | null> {
      const response = await api("/users/login", { email, password });
      if(!response.isSuccess){
        return null;
      }
      session.user = response.data.user;
      session.token = response.data.token;
      router.push(session.redirectUrl || "/");
      return session.user;
    },
    async register(user:User): Promise< User | null> {
      const response = await api("/users/addUser", user);
      if(!response.isSuccess){
        return null;
      }
      session.user = response.data.user;
      session.token = response.data.token;
      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout(){
      session.user = null;
      session.token = null;
      router.push("/login");
    }
  }
}
