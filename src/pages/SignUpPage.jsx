import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerUser, updateProfile } from "@/services/apiBlog";
import InputError from "@/ui_components/InputError";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = ({userInfo, updateForm, toggleModal}) => {
  const { register, handleSubmit, formState, reset, watch } = useForm({defaultValues: userInfo ? userInfo : {}});
  const { errors } = formState;
  const queryClient = useQueryClient()
  const password = watch("password");

  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully!")
      toggleModal()
      queryClient.invalidateQueries({queryKey: ["users", userInfo?.username]})
    },

    onError: (err) => {
      toast.error(err.message)
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("You have successfully created an account!!!");
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    if(updateForm){
      const formData = new FormData()
      formData.append("username", data.username)
      formData.append("first_name", data.first_name)
      formData.append("last_name", data.last_name)
      formData.append("job_title", data.job_title)
      formData.append("bio", data.bio)
      formData.append("facebook", data.facebook);
      formData.append("youtube", data.youtube);
      formData.append("instagram", data.instagram);
      formData.append("twitter", data.twitter);


      if(data.profilepic && data.profilepic[0]){
        if(data.profilepic[0] != "/"){
          formData.append("profilepic", data.profilepic[0])
        }
      }

      updateProfileMutation.mutate(formData)


    }

    else{
      mutation.mutate(data)
    }
    
  }

  return (
<form
      className={`${
        updateForm && "h-[90%] overflow-auto"
      } md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
      onSubmit={handleSubmit(onSubmit)}
    >
    <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">{updateForm ? "Update profile" : 'SignUp Form'}</h3>
        {updateForm
            ? "You can tell us more about you."
            : "Create your account to get started!"}
    </div>

{/* username */}

    <div>
        <Label htmlFor="username" className="dark:text-[97989F]">
        Username
        </Label>
        <Input
        type="text"
        id="username"
        placeholder="Enter username"
        {...register("username", {
            required: "Username is required",
            minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
            },
        })}
        className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
        <small className="text-red-700">{errors.username.message}</small>
        )}
    </div>

{/* firstname */}

      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          {...register("first_name", {
            required: "Firstname is required",
            minLength: {
              value: 3,
              message: "Firstname must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.first_name?.message && (
          <small className="text-red-700">{errors.first_name.message}</small>
        )}
      </div>

{/* lastname */}

      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          {...register("last_name", {
            required: "Lastname is required",
            minLength: {
              value: 3,
              message: "Lastname must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.last_name?.message && (
          <small className="text-red-700">{errors.last_name.message}</small>
        )}
      </div>


{/* job title */}

      {updateForm && <div>
        <Label htmlFor="job_title" className="dark:text-[97989F]">
          Job Title
        </Label>
        <Input
          type="text"
          id="job_title"
          placeholder="Enter Job Title"
          {...register("job_title", {
            required: "Your job title is required",
            minLength: {
              value: 3,
              message: "Your job title must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.job_title?.message && (
          <InputError error={errors.job_title.message} />
        )}
      </div>}

{/* bio */}

      {updateForm && <div>
        <Label htmlFor="content">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us more about you"
          {...register("bio", {
            required: "Your bio is required",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[300px] text-justify"
        />
        {errors?.bio?.message && (
          <InputError error={errors.bio.message} />
        )}
      </div>}

{/* profile picture */}

      {updateForm && <div className="w-full">
        <Label htmlFor="profile_picture">Profile Picture</Label>
        <Input
          type="file"
          id="profilepic"
          {...register("profilepic", {
            required: false,
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
        />

        {/* {errors?.profile_picture?.message && (
          <InputError error={errors.profile_picture.message} />
        )} */}
      </div>}


{/* password */}

      {updateForm || <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.password?.message && (
          <small className="text-red-700">{errors.password.message}</small>
        )}
      </div>}

{/* confirm password */}

      {updateForm || <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.confirmPassword?.message && (
          <small className="text-red-700">
            {errors.confirmPassword.message}
          </small>
        )}
      </div>}

            {/* Facebook */}
      {updateForm && <div>
        <Label htmlFor="facebook">Facebook</Label>
        <Input
          type="url"
          id="facebook"
          placeholder="https://facebook.com/your-profile"
          {...register("facebook")}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
      </div>}

      {/* YouTube */}
      {updateForm && <div>
        <Label htmlFor="youtube">YouTube</Label>
        <Input
          type="url"
          id="youtube"
          placeholder="https://youtube.com/your-channel"
          {...register("youtube")}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
      </div>}

      {/* Instagram */}
      {updateForm && <div>
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          type="url"
          id="instagram"
          placeholder="https://instagram.com/your-handle"
          {...register("instagram")}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
      </div>}

      {/* Twitter */}
      {updateForm && <div>
        <Label htmlFor="twitter">Twitter</Label>
        <Input
          type="url"
          id="twitter"
          placeholder="https://twitter.com/your-handle"
          {...register("twitter")}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
      </div>}


      <div className="w-full flex items-center justify-center flex-col my-4">
        {updateForm ? (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {updateProfileMutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Updating user..." />
              </>
            ) : (
              <SmallSpinnerText text="Update user profile" />
            )}
          </button>
        ) : (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Creating user..." />
              </>
            ) : (
              <SmallSpinnerText text="Signup" />
            )}
          </button>
        )}
       {updateForm || <p className="text-[14px]">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>}
      </div>
    </form>
  );
};

export default SignupPage;
