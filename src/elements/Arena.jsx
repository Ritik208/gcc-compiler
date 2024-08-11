import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Moon, Sun } from "lucide-react";
import axios from 'axios';
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
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

const FormSchema = z.object({
    editor: z
        .string()
        .min(10, {
            message: 'Editor must contain at least 10 characters.',
        })
        .max(500, {
            message: 'Character count must be less than 500.',
        }),
});

const testCases = [
    {
        id: 1,
        description: 'Test case 1 description',
        input: 'inputString1',
        output: 'actualOutput1',
        expectedOutput: 'expectedOutput1',
        status: 'passed' // or 'failed'
    },
    {
        id: 2,
        description: 'Test case 2 description',
        input: 'inputString2',
        output: 'actualOutput2',
        expectedOutput: 'expectedOutput2',
        status: 'failed' // or 'passed'
    },
    {
        id: 3,
        description: 'Test case 3 description',
        input: 'inputString3',
        output: 'actualOutput3',
        expectedOutput: 'expectedOutput3',
        status: 'passed' // or 'failed'
    },
    {
        id: 4,
        description: 'Test case 4 description',
        input: 'inputString4',
        output: 'actualOutput4',
        expectedOutput: 'expectedOutput4',
        status: 'failed' // or 'passed'
    },
    {
        id: 5,
        description: 'Test case 5 description',
        input: 'inputString5',
        output: 'actualOutput5',
        expectedOutput: 'expectedOutput5',
        status: 'passed' // or 'failed'
    }
];

export function Arena() {
    const { setTheme } = useTheme();
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });
    const [output, setOutput] = useState('');
    const [pass, setPass] = useState(0);
    const [total, setTotal] = useState(0);
    const [showDetails,setShowDetails]=useState(false);
    const onSubmit = async (data) => {
        try {
            const postData = {
                code: data.editor,
                timeout: 5000,  // Example timeout value
                compilerFlags: "-std=c++11"  // Example compiler flags
            };

            console.log(postData);
            const response = await axios.post('http://localhost:5000/api/v1/run', postData);
            
            setPass(testCases.filter(testCase => testCase.status === 'passed').length);
            setTotal(testCases.length);
            setOutput(JSON.stringify(response.data, null, 2));
            setShowDetails(true);
        } catch (error) {
            console.log(error);
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
            <div className='flex mt-16'>
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
                {showDetails && <div className='ml-56 mt-8  p-6 w-full shadow-lg rounded-lg'>
                    <h1 className='text-2xl font-semibold mb-4'>{pass}/{total} test cases passed</h1>
                    <div className='mt-4'>
                        <h2 className='text-xl font-bold mb-2'>Test Case Details:</h2>
                        {testCases.map(testCase => (
                            <Accordion key={testCase.id} type="single" collapsible className='mb-4'>
                                <AccordionItem value={`item-${testCase.id}`}>
                                    <AccordionTrigger className={`p-4 rounded-lg ${testCase.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} transition-all duration-300 ease-in-out`}>
                                        <h3 className='text-lg font-semibold'>Test Case {testCase.id}</h3>
                                    </AccordionTrigger>
                                    <AccordionContent className='p-4 border border-gray-200 rounded-b-lg '>
                                        <div className='mb-2'>
                                            <span className='font-medium'>Input:</span> {testCase.input}
                                        </div>
                                        <div className='mb-2'>
                                            <span className='font-medium'>Output:</span> {testCase.output}
                                        </div>
                                        <div className='mb-2'>
                                            <span className='font-medium'>Expected Output:</span> {testCase.expectedOutput}
                                        </div>
                                        <div>
                                            <span className='font-medium'>Status:</span> {testCase.status}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>}
            </div>
        </>
    );
}
