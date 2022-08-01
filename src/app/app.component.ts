import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { filter, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  rowData$!: Observable<any[]>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  colDefs: ColDef[] = [
    {field: "make"},
    {field: "model"},
    {field: 'price'}
  ];

  defaultColDef: ColDef ={
    sortable: true, filter: true } ;

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  onCellClicked(event: CellClickedEvent){
    console.log(event.data)
    console.log(event.node)
  }

  clearSelection(){
    this.agGrid.api.deselectAll();
  }
}
