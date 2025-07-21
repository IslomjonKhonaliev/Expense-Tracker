"use server"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getIncomeExpense = async (): Promise<{income?: number; expense?: number; error?: string;}> => {
    const { userId } = await auth();

    if(!userId) {
        return {error: "User not found"}
    }

    try {
        const transactions = await db.transaction.findMany({
            where: {userId},
        });

        const amounts = transactions.map((transaction) => transaction.amount);

        // Take income from amount
        const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0);

        // Take expense form amount
        const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0);

        return {income, expense: Math.abs(expense)};
    } catch (error) {
        return {error: "Database error"}
    }
}
 
export default getIncomeExpense;