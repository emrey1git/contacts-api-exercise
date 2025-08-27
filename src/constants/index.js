export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;     // Default sayfa boyutu
export const DEFAULT_SORT_FIELD = "name";  // Default sıralama alanı
export const DEFAULT_SORT_ORDER = "asc";   // Default sıralama yönü

export const SORT_FIELDS = ["name", "phone", "email", "createdAt"];
export const SORT_ORDER = ["asc", "desc"];

export const ROLES ={
    USER: "user",
    ADMIN: "admin",
}

export const TOKEN_EXPIRATION ={
     ACCESS_TOKEN: 15 * 60 * 1000, 
  REFRESH_TOKEN:  24 * 60 * 60 * 1000, 
}
