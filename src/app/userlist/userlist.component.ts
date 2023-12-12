import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpForm } from '../model';
import { ServiceService } from '../service.service';
import { FormGroup,FormBuilder, FormControl, FormArray, Validators} from '@angular/forms';
import { UserformComponent } from '../userform/userform.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'email', 'mob', 'gender', 'addr', 'edit', 'delete'];
  
  isTrue:boolean = false;
  user:EmpForm[] = [];
  public static emp:EmpForm;
  
  constructor(private fb:FormBuilder,private cs:ServiceService,private dialog:MatDialog){}
  dataSource:any;
  ngOnInit():void{
    
    this.cs.EmpGetData().subscribe(list=>{
      this.user = list.reverse();
    
      this.dataSource = new MatTableDataSource<EmpForm>(this.user);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
    
  }
  FilterChange(event:Event){
  const filvalue =(event.target as HTMLInputElement).value;
  this.dataSource.filter=filvalue;
  }
  
  delete(id:number){
    if(confirm('Are you sure to delete record?'))
    this.cs.EmpDelete(id).subscribe(res=>{
      alert("Deleted Successfully");
      window.location.reload();
    });
    
  }
  edit(emp:EmpForm,id:number){
     this.cs.EmpEdit(emp,id).subscribe();
  }
  getsingle(id:number){
    this.cs.EmpGetsingle(id).subscribe(emp => {
     UserlistComponent.emp = emp;
     let obj = new UserformComponent(this.fb,this.cs);
     obj.Edt(emp);
     this.cs.DoSomething(emp);
     
     //this.cs.sendClickEvent();
    });
    
  }

}

