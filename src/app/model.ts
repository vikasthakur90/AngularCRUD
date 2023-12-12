export class EmpForm{
    id:number;
    name:string;
    mob:String;
    addr:string;
    gender:string;
    email:string;
    constructor(id:number,name:string,mob:String,addr:string,gender:string,email:string){
        this.id = id;
        this.name = name;
        this.mob = mob;
        this.addr = addr;
        this.gender=gender;
        this.email=email;
    }
}