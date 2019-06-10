'use stict';


const AppData={
    widgets_footer:{
        active_proposals:"Active Proposals",
        proposal_due_today:"Proposal Due Today",
        activity_in_past_month:"Activity in Past 30 days",
        proposal_past_due:"Proposal Past Due"
    },
    URL:{
        training:{
            get:"http://localhost:5000/trainings/all",
            get_module_name:"http://localhost:5000/trainings/getModules/",
            get_selected_module:"http://localhost:5000/trainings/getselectedmodule/",
            add:"http://localhost:5000/trainings/add",
            get_by_id:"http://localhost:5000/trainings/get_by_evaluator/",
            get_table:"http://localhost:5000/trainings/table/",
            attach_Evaluators:"http://localhost:5000/trainings/attach/evaluator",
            get_tasks:"http://localhost:5000/trainings/tasks/all/orgId",
            get_tasks_user:"http://localhost:5000/trainings/tasks/all/evaluatorId",
            save_response:"http://localhost:5000/trainings/response/save",
            submit_response:"http://localhost:5000/trainings/response/submit",
            get_module:"http://localhost:5000/trainings/response/module/",  
                     
        },      
        roles:{
            get_all:'http://localhost:5000/roles/all',
            get_roles:'http://localhost:5000/user/roles',
            update_roles:'http://localhost:5000/roles/updateRoles'
        },      
        vendors:{
            vendors_name:"http://localhost:5000/vendors/names",
            proposal_vendor:"http://localhost:5000/projects/vendors",
            attach_vendors:"http://localhost:5000/projects/attachvendors" ,
            add_vendor:"http://localhost:5000/vendors/add",
            all:"http://localhost:5000/vendors/all/OrgID",
            remove_vendors:"http://localhost:5000/tasks/deleteTask/byVendorID",
            detach_vendors:"http://localhost:5000/tasks/detachVendors"
        },    
        RFPs:{
            get_by_vendorId:"http://localhost:5000/RFPs/getByVendorId",
            attach:"http://localhost:5000/RFPs/attach",
            delete:"http://localhost:5000/RFPs/delete",            
        },    
        users:{
                getevaluators:'http://localhost:5000/user/getevaluators',
                getprocurementofficers:'http://localhost:5000/user/getprocurementofficers',
                add_user:'http://localhost:5000/user/adduser',
                all:"http://localhost:5000/user/org/all/",
                authenticate:"http://localhost:5000/user/authenticate",
                forgotPass:"http://localhost:5000/user/forgotPass",
                updatePass:"http://localhost:5000/user/updatePass"
        },
        projects:{
            add_project:"http://localhost:5000/projects/add",
            project:"http://localhost:5000/projects",
            names:'http://localhost:5000/projects/names',
            get_all:"http://localhost:5000/projects/all",
            calculate:"http://localhost:5000/stats/calculate",
            keywords:"http://localhost:5000/projects/keywords"
        },task:{
            all_task:"http://localhost:5000/tasks/org/all",
            create_task:"http://localhost:5000/tasks/add",
            publish_task:"http://localhost:5000/tasks/changeStatus",
            evaluator_task:"http://localhost:5000/tasks/evaluator/tasks",
            evaluator_publishedTasks:"http://localhost:5000/tasks/publishedTasks"
        },templates:{
            get_template:"http://localhost:5000/templates/",
            info:'http://localhost:5000/templates/info',
            names:'http://localhost:5000/templates/names',         
            add_template: "http://localhost:5000/templates/addtemplate"  
        },evauation:{
            save_response:"http://localhost:5000/savedresponses/addupdate",
            get_savedresponse:"http://localhost:5000/savedresponses/getresponses/",
            get_response:"http://localhost:5000/savedresponses/byID",
            get_vendorId:"http://localhost:5000/tasks/getvendorId", 
            submit_response:"http://localhost:5000/response/add",
            get_responses_proposalID:"http://localhost:5000/response//proposal/",           
        },
    },
    Task_Status:{
        published:"published",
        unpublished:"unpublished",
        opened:"opened",
        submitted:"submitted",
        inprogress:"in progress"
    },
    evauation_criteria:{
        nominal:"Nominal",
        ordinal:"Ordinal"
    },
    trainings:{
        isTraining:"training",
        isCalibration:"calibration",
        isTask:"task"
    },
    views:{
        QAView:"QAView",
        ReviewView:"ReviewView"
    }
};
export default AppData;