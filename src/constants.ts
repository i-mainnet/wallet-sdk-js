// default로 메인넷 url 설정
export let baseURL: string = "https://testbackend.initialmn.io/v1/a2a";

export function setBaseURL(newURL: string): void {
  baseURL = newURL;
}
