let itemRequests={
    id:{},
    requested_by:{},
    request_type:{},
    data_Type:{},
    purpose:{},
    items_required:{},
    Manager:{},


}

let wf_Tasks={
    id:{},
    assigned_to:{},
    actions:{}, // createItems, updateItems,approval
    table:{itemRecord},//table name for action
    table_columns_allowed:{}, //allowed table columns for this task 
    comments:{},//add comments
    ptid:{}, //id of parent task
    gpid:{}, //id of request
}

let wf_Task_Data_itemRecords={
    task_id:{},
    //.............sync all columns of items record. 
}

let itemRecords={//
    id:{},
    tag:{},
    type:{}, //cd ,dvd,pen, etc
    issuedTo:{},
    issuedData:{},
    
    returnedBy:{},
    returnedDate:{},
}

