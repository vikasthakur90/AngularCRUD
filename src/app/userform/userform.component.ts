import { Component } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, FormArray, Validators} from '@angular/forms';
import { EmpForm } from '../model';
import { ServiceService } from '../service.service';
import { UserlistComponent } from '../userlist/userlist.component';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  constructor(private fb:FormBuilder,private cs:ServiceService) { 
    cs.onClick.subscribe((data:EmpForm)=>{
     this.empForm = new FormGroup({
      id: new FormControl(data.id),
      name: new FormControl(data.name),
      mob : new FormControl(data.mob),
      addr : new FormControl(data.addr),
      gender: new FormControl(data.gender),
      email: new FormControl(data.email)

    })
    })
  }
  isValid = true;
  isMob = true;
  isAdd = true;
  empForm!:FormGroup;
  emp:EmpForm = UserlistComponent.emp;
  namepattern!:"[a-zA-Z][a-zA-Z ]+";
  
  ngOnInit(): void {
   
    this.empForm=this.fb.group({
      id:[''],
      name:['',[Validators.required,Validators.pattern(this.namepattern)]],
      mob:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      addr:['',[Validators.required]],
      gender: [''],
      email: ['']
   })
  
  }
  
   Edt(emp:EmpForm):void{
    
    console.log(UserlistComponent.emp);
 
   this.ngOnInit();
  }
  onSubmit()
  {

    if(this.empForm.valid)
    {
      if(this.empForm.value['id'] == ''){
      this.cs.EmpSave(this.empForm.value).subscribe();
      alert("Data Saved SuccessFully");
      //this.empForm.reset();
      window.location.reload();
      }
      else{
        this.cs.EmpEdit(this.empForm.value,this.empForm.value['id']).subscribe();
        window.location.reload();
      }
     
    }
    else{
      
    //   let str = "";
    //   if($("#name").val() == ""){
    //    str += " 1)Name Required\n";
    //    $("#name").css({'border-color':'red'});
    //    this.isValid = false;
    //   }
    //   if($("#mob").val() == "" || $("#mob").length != 10){
    //     str += "2)Empty Or Invalid Mobile No.\n";
    //     $("#mob").css({'border-color':'red'});
    //     this.isMob = false;
    //    }
    //   if($("#addr").val() == ""){
    //     str += " 3)Address Required";
    //     $("#addr").css({'border-color':'red'});
    //     this.isAdd = false;
    //    };
    //  alert(str);
    // }
 }
  }
  onReset(){
    this.empForm.reset();
    this.isValid = true;
        this.isMob=true;
        this.isAdd=true;
   }
}


