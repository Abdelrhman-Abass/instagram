/* eslint-disable @typescript-eslint/no-unused-vars */
import {z} from 'zod' 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link ,useNavigate } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { SignInValidation } from "@/lib/validation"
import  Loader  from '@/components/shared/Loader'

import {  useSignInAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'




const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {mutateAsync:signInAccount } = useSignInAccount();

  const {checkAuthUser ,isLoading: isUserLoading} = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof SignInValidation>) {
    
    const session = await signInAccount({
      email:values.email,
      password: values.password,
    })

    if(!session){
      return toast({
        title: "login in failed. Please try again.",
      })
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn){
      form.reset();
      navigate("/")
      toast({
        title:"Welcome Back",
      })
    }else{
      return toast({
        title: "login in failed. Please try again.",
      })
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Log in to your Account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome back, Please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email"  className='shad-input' {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password"  className='shad-input' {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
              )}
          />
          <Button type="submit" className='shad-button_primary'>
            {isUserLoading?(
              <div className='flex-center gap-2'>
                <Loader/> Loading ...
              </div>
            ):"Sign UP"}
            </Button>
            <p className='tex-small-regular text-light-2 text-center mt-2'>Don't have an account? <Link to="/sign-up" className='text-primary-500 text-small-semibold ml-1'>Sign up</Link> </p>
        </form>
      </div>

    </Form>
   
  )
}

export default SigninForm


