import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useAxiosImage } from "../useAxios/axios";
import toast from "react-hot-toast";

export const useAddNewAdmin = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-new-admin"],
    mutationFn: (data: Partial<UserType>) =>
      axios({
        url: "staff/create-admin",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["get-groups"],
        exact:false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


interface LeaveStaffType {
  _id: string,
  start_date: string,
  end_date: string,
  reason: string,
}

export const useSetLeaveAdmin = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["leave-admin"],
    mutationFn: (data: LeaveStaffType) =>
      axios({
        url: "staff/leave-staff",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-admins"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


export interface UserType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}
export const useEditAdmins = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-admins"],
    mutationFn: (data: UserType) =>
      axios({
        url: "staff/edited-admin",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-admins"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


export const useDeleteAdmin = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-admin"],
    mutationFn: (_id:string) =>
      axios({
        url: "staff/deleted-admin",
        method: "DELETE",
        body: {_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-admins"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useReturnWorkStaff = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-admin"],
    mutationFn: (_id:string) =>
      axios({
        url: "staff/return-work-staff",
        method: "POST",
        body: {_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-admins"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useDeletTeachers = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-teacher"],
    mutationFn: (_id:string) =>
      axios({
        url: "teacher/fire-teacher",
        method: "DELETE",
        body: {_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-teachers"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useReturnTeacher = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["return-teacher"],
    mutationFn: (_id:string) =>
      axios({
        url: "teacher/return-teacher",
        method: "POST",
        body: {_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-teachers"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useDeletestudents = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-students"],
    mutationFn: (_id:string) =>
      axios({
        url: "student/delete-student",
        method: "DELETE",
        body: {_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-students"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useReturnStudent = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["return-student"],
    mutationFn: (_id:string) =>
      axios({
        url: "student/return-student",
        method: "POST",
        body: {_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-students"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useReturnFromVacation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["return-leave-student"],
    mutationFn: (_id:string) =>
      axios({
        url: "student/return-leave-student",
        method: "POST",
        body: {student_id:_id},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-students"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


export interface StudentType {
  first_name: string;
  last_name: string;
  phone: string;
  groups: {
    group: string; 
  }[];
}

export const useAddStudent = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-new-student"],
    mutationFn: (data:StudentType) =>
      axios({
        url: "student/create-student",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-students"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


interface NewGroupAddType {
  student_id:string;
  group_id:string;
  joinedAt:string;
}


export const useAddNewGroup = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-student-new-group"],
    mutationFn: (data:NewGroupAddType) =>
      axios({
        url: "student/added-new-group-student",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-students"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};




interface LeaveStudentType {
  student_id:string;
  leave_days:string;
  reason:string
}

export const useLeaveFromGroup = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["leave-student-vacation"],
    mutationFn: (data:LeaveStudentType) =>
      axios({
        url: "student/leave-student",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-all-students"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


interface GroupType {
  course_id:string;
  teacher:string;
  started_group:string;
}



export const useAddGroup = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-grouppp"],
    mutationFn: (data:GroupType) =>
      axios({
        url: "group/create-group",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-groups"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};





export const useChangeGroupTime = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["change-group-time"],
    mutationFn: ({_id, date}: {_id:string; date:string}) =>
      axios({
        url: "group/edit-end-group",
        method: "PUT",
        body: {_id, date}
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-groups"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



export const useEndGroup = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["end-group"],
    mutationFn: (_id:string) =>
      axios({
        url: "group/end-group",
        method: "DELETE",
        body: {_id}
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["get-groups"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};





export const useFreezeCourse = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["freeze-course"],
    mutationFn: (course_id:string) =>
      axios({
        url: "course/freeze-course",
        method: "PUT",
        body: {course_id}
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["all-courses"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};


export const useUnfreezeCourse = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["unfreeze-course"],
    mutationFn: (course_id:string) =>
      axios({
        url: "course/unfreeze-course",
        method: "PUT",
        body: {course_id}
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["all-courses"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



interface EditCourseType {
  course_id:string | undefined;
  price:number;
  duration:string
}

export const useEditCourse = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-course"],
    mutationFn: (data:EditCourseType) =>
      axios({
        url: "course/edit-course",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["all-courses"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



interface AddNewCourseType {
  name:string;
  description:string;
  duration:string;
  price:number
}



export const useAddNewCourse = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-new-course"],
    mutationFn: (data:AddNewCourseType) =>
      axios({
        url: "course/create-course",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["all-courses"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};






export const useAddNewCategory = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-new-category"],
    mutationFn: (name:string) =>
      axios({
        url: "course/create-category",
        method: "POST",
        body: {name}
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
       queryKey:["all-courses"],
       exact :false
      });

    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};



interface UserEditType {
  first_name:string;
  last_name:string;
  email:string
}

export const useEditedProfile = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: (data:UserEditType) =>
      axios({
        url: "auth/edit-profile",
        method: "POST",
        body: data
      }),
    onSuccess: () => {
      toast.success("Ma'lumotlar o'zgartirildi")
    },
    onError: () => {
      toast.error("Xatolik yuz berdi");
    },
  });
};




export const useEditedProfileImage = () => {
  const axios = useAxiosImage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-profile-img"],
    mutationFn: (formData: FormData) =>
      axios({
        url: "auth/edit-profile-img", 
        method: "POST",
        body: formData,
       
      }),
    onSuccess: () => {
      toast.success("Profil rasmi yangilandi");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => {
      toast.error("Rasm yuklashda xatolik yuz berdi");
    },
  });
};