import { Component } from '@angular/core';
import { DataService } from '../../services/dataservice';
import { ArrayClass } from '../../Class/ArrayClass';
import * as moment from 'moment';

import * as AppConstant from '../../Constants/const';

declare var ActiveXObject: (type: string) => void;

@Component({
  selector: 'app-metadataform',
  templateUrl: './metadataform.component.html',
  styleUrls: ['./metadataform.component.css']
})
export class MetadataformComponent  {

  title = 'smsform';

  public loading = false;

  private authorDefaultId = 2;
  private languageDefaultId = 1;
  private geographyDefaultId = 1;
  private isCheckListType = false;
  
  public promoted;
  public mandatory;
  public languageModel;
  public authorModel;
  public geographyModel ;
  public typeModel;
  public contentTypeModel;
  public templateTypeModel;
  public citation = [];
  public area = [];
  public product = [];
  public industry = [];
  public topic = [];
  public governingBody = [];
  public correctResponse = [];
  public purgeDate;
  public effectiveDate;

  public xmetalCitation;
  public xmetalArea;
  public xmetalTopic;
  public xmetalIndustries;
  public xmetalProduct;
  public xmetalGoverningbody;
  public xmetalType;
  public xmetalContentType;
  public xmetalAuthor;
  public xmetalTemplatetype;
  public xmetalLanguage;
  public xmetalGeography;
  public xmetalMandatory;
  public xmetalPromoted;
  public xmetalCorrectResponses;

  

//Multiselect settings
public citationSettings;
public dropdownSettings;
public singleDropdownSettings;

    //Values from XMETAL
    public attrAuthor;
    public attrLanguage;
    public attrArea;
    public attrTopics;
    public attrCitations;
    public attrType;
    public attrContentType;
    public attrEffectivedate;
    public attrGeography;
    public attrGoverningbody;
    public attrIndustries;
    public attrMandatory;
    public attrPromoted;
    public attrProduct;
    public attrPurgedate;
    public attrTemplatetype;
    public attrCorrectResponses;

    //wait till all the data loaded from web service
    public isDataLoaded = false;

     // Property of the Collection results 
  public authors: any = [];
  public languages: any = [];
  public areas: any = [];
  public governingBodies: any =[];
  public citations: any = [];
  public industries: any = [];
  public topics: any = [];
  public products: any = [];
  public sysnonyms: any = [];
  public templateTypes: any = [];
  public types: any = [];
  public contentTypes: any = [];
  public geographies: any = [];
  public correctResponses : any = [];
  public availableCorrectResponses : any = [];

 constructor(private api: DataService,
             private arrayClass : ArrayClass){}


 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
    
   this.loading = true;
   this.connectToXmetal();
   this.getResults();
   this.setHiddenValues();  
 }


 //Connect to XMETAL APP and read all the Metadata tag attribute values.
 connectToXmetal() {
  var xmlApp = new ActiveXObject(AppConstant.constfields.XMETAL_APPLICATION);
 this.attrAuthor = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.AUTHOREDBY);
 this.attrLanguage = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.LANGUAGE);
 this.attrArea = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.AREA);
 this.attrTopics = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.TOPIC);
 this.attrCitations = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.CITATIONS);
 this.attrType = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.TYPE);
 this.attrContentType = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.CONTENTTYPE);
 this.attrEffectivedate = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.EFFECTIVEDATE);
 this.attrGeography = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.GEOGRAPHY);
 this.attrGoverningbody = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.GOVERNINGBODY);
 this.attrIndustries = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.INDUSTRIES);
 this.attrMandatory = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.MANDATORY);
 this.attrPromoted = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.PROMOTED);
 this.attrProduct = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.PRODUCT);
 this.attrPurgedate = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.PURGEDATE);
 this.attrTemplatetype = xmlApp.Selection.ContainerNode.getAttribute(AppConstant.constfields.TEMPLATETYPE);
 var rng = xmlApp.ActiveDocument.Range;
 this.isCheckListType = rng.IsParentElement(AppConstant.constfields.CHECKLISTQUESTION);
    if(this.isCheckListType)
    {
        var selectNode = rng.ContainerNode;
        var count = 0;
        while(selectNode.nodeName != AppConstant.constfields.CHECKLISTQUESTION)
          selectNode = selectNode.parentNode;
        this.attrCorrectResponses = selectNode.getAttribute(AppConstant.constfields.CORRECTRESPONSES);
    }
 } 

  // Get data from the rest API
  getResults() {

    this.api.getData().subscribe(results => {
      // set the results of all the fields from forkjoin api call
      
      this.authors = results[0];
      this.languages = results[1];
      this.areas = results[2];
      this.governingBodies = results[3];
      this.citations = results[4];
      this.industries = results[5];
      this.topics = results[6];
      this.products = results[7];
      this.sysnonyms = results[8];
      this.templateTypes = results[9];
      this.types = results[10];
      this.contentTypes = results[11];
      this.geographies = results[12];
      this.correctResponses = results[13];
      this.isDataLoaded = true;
       this.loading = false;

    
     

      //call to set the selected value based on xmetal app values
      setTimeout(() => {
        this.setSingleSeletedValue();
        this.setMultipleSelectedValues();
        this.setDateFieldValues();
        this.setBooleanFieldValue();
      });
     
    });
  }

  setMadatoryRadioButton(){
     this.xmetalMandatory = this.mandatory;
  }

  setPromotedRadioButton(){
    this.xmetalPromoted = this.promoted;
  }

   //Set date on date fields with the dates from XMETAL App.

   public setDateFieldValues()
   {
     if(this.attrPurgedate)
       this.purgeDate = this.attrPurgedate;
     if(this.attrEffectivedate)
        this.effectiveDate = this.attrEffectivedate;
   }



// Set Seleted value for multi select field with the values from XMETAL App.
public setMultipleSelectedValues(){
 
    if(this.attrCitations){
     let arrString =   this.attrCitations.split(" ");
     let arrObject = arrString.map( res => {
      return this.citations.find(o => o.id == res);
       });
       this.citation = arrObject.map(o => o.id);
    }
    if(this.attrArea){
      let arrString =   this.attrArea.split(" ");
      let arrObject = arrString.map( res => {
       return this.areas.find(o => o.id == res);
        });
        this.area = arrObject.map(o => o.id);
    }
    if(this.attrTopics){
      let arrString =   this.attrTopics.split(" ");
      let arrObject = arrString.map( res => {
       return this.topics.find(o => o.id == res);
        });
        this.topic = arrObject.map(o => o.id);
    }
    if(this.attrProduct){
       let arrString =   this.attrProduct.split(" ");
    let arrObject = arrString.map( res => {
       return this.products.find(o => o.id == res);
        });
        this.product = arrObject.map(o => o.id);
    }
    if(this.attrGoverningbody){
      let arrString =   this.attrGoverningbody.split(" ");
      let arrObject = arrString.map( res => {
       return this.governingBodies.find(o => o.id == res);
        });
        this.governingBody = arrObject.map(o => o.id);
    }
   if(this.attrIndustries){
      let arrString = this.attrIndustries.split(" ");
     let arrObject = arrString.map( res => {
        return this.industries.find(o => o.id == res);
     });
     this.industry =  arrObject.map(o => o.id);
   }

     // Available response will be only available for check list document type and it will 
    // based on the types
    if(this.attrCorrectResponses){
      this.availableCorrectResponses = this.correctResponses.filter( c => c.typeid == this.attrType);
      console.log(this.availableCorrectResponses);
      let arrString = this.attrCorrectResponses.split(" ");
      let arrObject = arrString.map(res => {
        return this.availableCorrectResponses.find( o => o.id == res);
      });
      this.correctResponse = arrObject.map(o => o.id);
    }

  }

 //set selected value on the web App with values from xmetal app
 public setSingleSeletedValue()
 {
    if(this.attrAuthor)
    this.authorModel = this.authors.find( o => o.id == this.attrAuthor);
    else{
      this.authorModel = this.authors.find( o => o.id == this.authorDefaultId);
      this.xmetalAuthor = this.authorDefaultId;
    }
    if(this.attrLanguage)
      this.languageModel = this.languages.find( o => o.id == this.attrLanguage);
    else{
      this.languageModel = this.languages.find( o => o.id == this.languageDefaultId);
      this.xmetalLanguage = this.languageDefaultId;
    }
    if(this.attrContentType)
    this.contentTypeModel = this.contentTypes.find( o => o.id == this.attrContentType);

    if(this.attrType)
    this.typeModel=  this.types.find( o => o.id == this.attrType);
  

    if(this.attrGeography)
    this.geographyModel = this.geographies.find( o => o.id == this.attrGeography);
    else{
      this.geographyModel = this.geographies.find( o => o.id == this.geographyDefaultId);
      this.xmetalGeography = this.geographyDefaultId;
    }

    if(this.attrTemplatetype)
    this.templateTypeModel = this.templateTypes.find( o => o.id == this.attrTemplatetype);
 }

   // Set boolean field values from XMETAL APP.
public setBooleanFieldValue() {
    if(this.attrPromoted)
        this.promoted = this.attrPromoted;
    if(this.attrMandatory)
        this.mandatory = this.attrMandatory;
 }




  setRelatedFieldTypeValues(){
    
    if(this.typeModel){
            this.xmetalType = this.typeModel.id;
            let contentTypeObj = this.contentTypes.find( o => o.id == this.typeModel.contentId);
            let templateTypeObj = this.templateTypes.find( o => o.id == this.typeModel.templateId );
            //Set Content Type based on Type
            this.contentTypeModel = contentTypeObj;
            this.xmetalContentType = this.contentTypeModel.id;
            // Set Template Type based on Type
            this.templateTypeModel = templateTypeObj;
            this.xmetalTemplatetype = this.templateTypeModel.id;
            this.availableCorrectResponses = this.correctResponses.filter( c => c.typeid == this.xmetalType);
            // Set CorrectResponses , if the selected type is of check list type.
            if(this.availableCorrectResponses && this.isCheckListType) {
              this.xmetalCorrectResponses = '';
              this.correctResponse = [];
            }
    }
    else{
       this.contentTypeModel = '';
       this.templateTypeModel = '';
       this.availableCorrectResponses = [];
       this.xmetalCorrectResponses = '';
    }
  }

  onAreaSelect(){
    this.xmetalArea = this.arrayClass.setMultivalues(this.area);
  }
  onTopicSelect(){
    this.xmetalTopic = this.arrayClass.setMultivalues(this.topic);
  }
  onProductSelect(){
    this.xmetalProduct = this.arrayClass.setMultivalues(this.product);
  }
  onGoverningBodySelect(){
    this.xmetalGoverningbody = this.arrayClass.setMultivalues(this.governingBody);
  }
  onIndustrySelect(){
    this.xmetalIndustries = this.arrayClass.setMultivalues(this.industry);
  }

  onAuthorSelect(){
   this.xmetalAuthor = this.authorModel.id;
 }

 onGeographySelect(){
   this.xmetalGeography = this.geographyModel.id;
 }

 onLanguageSelect() {
   this.xmetalLanguage = this.languageModel.id;
 }
 
 onAddCitations(data) {
   this.citation.push(data.id);
  this.setXmetalAndCitationRelatedFields();
 }

 onRemoveCitations(data){
  this.citation = this.arrayClass.removeArrayValue(this.citation,data.id);
  this.setXmetalAndCitationRelatedFields();
 }

 onclearAreas(){
  this.area = [];
  this.xmetalArea = this.area;
 }

 onclearCorrectResponses() {
   this.correctResponse = [];
   this.xmetalCorrectResponses = this.correctResponse;
 }

 onclearProducts(){
  this.product = [];
  this.xmetalProduct = this.product;
}

onclearTopics(){
  this.topic = [];
  this.xmetalTopic = this.topic;
}

onclearIndustries(){
  this.industry = [];
  this.xmetalIndustries = this.industry;
}

onclearGoverningBodies(){
  this.governingBody = [];
  this.xmetalGoverningbody = this.governingBody;
}

 onAddAreas(data){
    this.area.push(data.id);
    this.xmetalArea = this.arrayClass.setMultivalues(this.area);
 }

 onAddCorrectResponses(data){
   this.correctResponse.push(data.id);
   this.xmetalCorrectResponses = this.arrayClass.setMultivalues(this.correctResponse);
 }

 onAddProducts(data){
   this.product.push(data.id);
   this.xmetalProduct = this.arrayClass.setMultivalues(this.product);
 }

 onAddTopics(data){
   this.topic.push(data.id);
   this.xmetalTopic = this.arrayClass.setMultivalues(this.topic);
 }

onAddIndustries(data){
  this.industry.push(data.id);
  this.xmetalIndustries = this.arrayClass.setMultivalues(this.industry);
}

 onAddGoverningBodies(data){
   this.governingBody.push(data.id);
   this.xmetalGoverningbody = this.arrayClass.setMultivalues(this.governingBody);
 }

 onRemoveAreas(value){
   this.xmetalArea = this.arrayClass.removeArrayValue(this.area,value.id);
 }

 onRemoveCorrectResponses(value){
     this.xmetalCorrectResponses = this.arrayClass.removeArrayValue(this.correctResponse,value.id);
 }

 onRemoveProducts(value){
   this.xmetalProduct = this.arrayClass.removeArrayValue(this.product,value.id);
 }

 onRemoveTopics(value){
   this.xmetalTopic = this.arrayClass.removeArrayValue(this.topic,value.id);
 }

 onRemoveIndustries(value){
   this.xmetalIndustries = this.arrayClass.removeArrayValue(this.industry,value.id);
 }

 onRemoveGoverningBodies(value){
   this.xmetalGoverningbody - this.arrayClass.removeArrayValue(this.governingBody,value.id);
 }
 

 

  setXmetalAndCitationRelatedFields(){

    if(this.citation !=null && this.citation.length != 0){
     
      this.xmetalCitation = this.arrayClass.setMultivalues(this.citation);
    
    let areasObjectArray : any = [];
    let governingBodiesObjArray : any = [];
    let industriesObjectArray : any = [];
    let productsObjectArray : any = [];
    let topicsObjectArray : any = [];

    let cfrareaArray : any = [];
    let cfrgoverningBodiesArray : any = [];
    let cfrindustriesArray : any = [];
    let cfrproductArray : any = [];
    let cfrTopicsArray : any = [];

    let listofIds = this.arrayClass.createArrayofIds(this.citation);
      this.api.getCFRRelatedIDs("cfrareas",listofIds).subscribe( cfrarea => {
        this.loading = true;
        cfrareaArray = Array.from(new Set(cfrarea));
        cfrareaArray.forEach( areaId => {
            areasObjectArray.push(this.areas.find(o => o.id == areaId));
        });
        this.area = areasObjectArray.map(i => i.id);
        this.xmetalArea = this.arrayClass.setMultivalues(this.area);
        this.loading  = false;
      });

    this.api.getCFRRelatedIDs("cfrgoverningbodies",listofIds).subscribe(cfrGovBody => {
      this.loading = true;
      cfrgoverningBodiesArray = Array.from(new Set(cfrGovBody));
      cfrgoverningBodiesArray.forEach( govId => {
        governingBodiesObjArray.push(this.governingBodies.find(o => o.id == govId));
      });
      this.governingBody = governingBodiesObjArray.map(i => i.id);
      this.xmetalGoverningbody = this.arrayClass.setMultivalues(this.governingBody);
      this.loading = false;
    });

  this.api.getCFRRelatedIDs("cfrindustries",listofIds).subscribe(cfrindustry => {
    this.loading = true;
    cfrindustriesArray = Array.from(new Set(cfrindustry));
    cfrindustriesArray.forEach( indId => {
      industriesObjectArray.push(this.industries.find( o=> o.id == indId));
    });

    this.industry = industriesObjectArray.map(i => i.id);
    this.xmetalIndustries = this.arrayClass.setMultivalues(this.industry);
    this.loading = false;
  });

  this.api.getCFRRelatedIDs("cfrproducts",listofIds).subscribe(cfrproduct => {
    this.loading = true;
    cfrproductArray = Array.from(new Set(cfrproduct));
    cfrproductArray.forEach( prdId => {
      productsObjectArray.push(this.products.find(o => o.id == prdId));
    });

    this.product = productsObjectArray.map(i => i.id);
    this.xmetalProduct =  this.arrayClass.setMultivalues(this.product);
    this.loading = false;
  });


  this.api.getCFRRelatedIDs("cfrtopics",listofIds).subscribe( cfrtopic => {
    this.loading = true;
    cfrTopicsArray = Array.from(new Set(cfrtopic));
    cfrTopicsArray.forEach( topicId => {
        topicsObjectArray.push(this.topics.find( o=> o.id == topicId));
    });
    this.topic = topicsObjectArray.map(i => i.id);
    this.xmetalTopic = this.arrayClass.setMultivalues(this.topic);
    this.loading = false;
  });

    let tempArrayforSortingDates  = [];
    this.citation.forEach( cid => {
      tempArrayforSortingDates.push(this.citations.find(o => o.id == cid));
    });
    tempArrayforSortingDates.sort((a,b) => {
        a = new Date(a.effectivedate);
        b = new Date(b.effectivedate);
        return a> b ? -1 : a < b ? 1 : 0;
    });
    // Using moment.js library to format date.
    this.effectiveDate = moment(tempArrayforSortingDates[0].effectivedate,"YYYY-MM-DD").format("MM-DD-YYYY");
  }
  else{
    this.area = [];
    this.governingBody = [];
    this.industry = [];
    this.topic = [];
    this.product = [];
    this.xmetalCitation = '';
    this.xmetalArea = '';
    this.xmetalGoverningbody = '';
    this.xmetalIndustries = '';
    this.xmetalProduct = '';
    this.xmetalTopic = '';
    this.effectiveDate = '';
  }
  }


  //This fun will set values from xmetal to the hidden input values to later assign back to xmetal
setHiddenValues(){
  if(this.attrArea)
      this.xmetalArea = this.attrArea;
  if(this.attrTopics)
      this.xmetalTopic = this.attrTopics;
  if(this.attrCitations)
      this.xmetalCitation = this.attrCitations;
  if(this.attrType)
      this.xmetalType = this.attrType;
  if(this.attrContentType)
      this.xmetalContentType = this.attrContentType;
  if(this.attrGeography)
    this.xmetalGeography = this.attrGeography;
  if(this.attrGoverningbody)
    this.xmetalGoverningbody = this.attrGoverningbody;
  if(this.attrIndustries)
    this.xmetalIndustries = this.attrIndustries;
  if(this.attrProduct)
  this.xmetalProduct = this.attrProduct;
  if(this.attrTemplatetype)
    this.xmetalTemplatetype = this.attrTemplatetype;
  if(this.attrAuthor)
      this.xmetalAuthor = this.attrAuthor;
    if(this.attrCitations)
       this.xmetalCitation = this.attrCitations;
       if(this.attrEffectivedate)
        this.effectiveDate = this.attrEffectivedate;
        if(this.attrPurgedate)
        this.purgeDate = this.attrPurgedate;
    if(this.attrMandatory)
      this.xmetalMandatory = this.attrMandatory;
    if(this.attrPromoted)
      this.xmetalPromoted = this.attrPromoted;
    if(this.attrCorrectResponses)
       this.xmetalCorrectResponses = this.attrCorrectResponses;
}

}
