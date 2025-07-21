"use server"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

const addTransaction = async (formData: FormData): Promise<TransactionResult> => {
    // Take all values
    const textValue = formData.get("text");
    const amountValue = formData.get("amount");

    // Check for inout values
    if(!textValue || textValue === "" || !amountValue) {
        return {error: "Text or Amount is missing"};
    }

    // Ensure text is string
    const text: string = textValue.toString();
    // Parse amount as number
    const amount: number = parseFloat(amountValue.toString());

    // Get logged in user
    const { userId } = await auth();

    // Check for user
    if(!userId) {
        return {error: "User not found"}
    }

    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId,
            }
        })
        revalidatePath("/");
        return {data: transactionData};
    } catch(error){
        return {error: "Transaction is not added"}
    }
    
}
 
export default addTransaction;