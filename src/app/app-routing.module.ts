import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrequencyComponent } from './component/frequency/frequency.component';
import { MetadataformComponent } from './component/metadataform/metadataform.component';

const routes : Routes = [
  {path : '' , 'component' : MetadataformComponent },
  { path : 'checklist' , 'component' : FrequencyComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
