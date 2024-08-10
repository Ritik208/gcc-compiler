import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

const FormSchema = z.object({
    editor: z
        .string()
        .min(10, {
            message: 'Editor must contain atleast 10 characters.',
        })
        .max(160, {
            message: 'Character count must be less than 160.',
        }),
});

export function TextareaForm() {
    const { setTheme } = useTheme();
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });
    const [output, setOutput] = useState('');
    const onSubmit = async (data) => {
        try {
            const postData = {
                code: data.editor,
            };
            const response = await axios.post('https://localhost:5000/v1/run', postData);
            setOutput(JSON.stringify(response.data, null, 2));
            toast({
                title: 'Success!',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
                    </pre>
                ),
            });
        } catch (error) {
            toast({
                title: 'Error!',
                description: 'Failed to submit data.',
            });
        }
    };

    return (
        <>
            <div className='flex mt-16 text-left'>
                <div>
                    <h1 className='font-bold text-3xl'>Two Sum</h1>
                    <h3 className='mt-4'>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

                        You may assume that each input would have exactly one solution, and you may not use the same element twice.

                        You can return the answer in any order.</h3>
                    <h3 className='mt-4'><h1 className='font-bold text-lg'>Example 1:</h1>

                        Input: nums = [2,7,11,15], target = 9
                        <h3>Output: [0,1]</h3>
                        <h3>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</h3>
                        
                    </h3>
                    <h3 className='mt-4'>
                        <h1 className='font-bold text-xl'>Example 2:</h1>

                        Input: nums = [3,2,4], target = 6
                        <h3>Output: [1,2]</h3>
                        <h3 className='mt-4'>
    <span className='font-bold text-xl'>Constraints:</span>
    <ul className='list-disc pl-5 mt-2'>
        <li>2 &le; nums.length &le; 10<sup>4</sup></li>
        <li>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></li>
        <li>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></li>
        <li>Only one valid answer exists.</li>
    </ul>
</h3>

                    </h3>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className='flex mt-16 justify-between'>
                <div className='flex'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="editor"
                                render={({ field }) => (
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-col">
                                            <FormLabel className="text-lg mb-2 text-left">Code-Editor</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter your code here"
                                                    className="resize-none w-[500px] h-[500px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="flex justify-start">
                                <Button
                                    variant="outline"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>


                </div>
                <div>
                <Textarea
                        placeholder="output"
                        className="resize-none w-[500px] h-[500px] mt-9"
                        value={output}
                        readOnly 
                    />
                </div>

            </div>
        </>
    );
}
