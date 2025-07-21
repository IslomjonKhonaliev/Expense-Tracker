import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { addCommas } from "@/lib/utils";

const IncomeExpense = async () => {
    const { income, expense } = await getIncomeExpense();
    return ( 
        <div className="inc-exp-container">
            <div>
                <h3>Income</h3>
                <p className="money plus">${addCommas(Number(income?.toFixed(2)))}</p>
            </div>
            <div>
                <h3>Expense</h3>
                <p className="money minus">${addCommas(Number(expense?.toFixed(2)))}</p>
            </div>
        </div>
    );
}
 
export default IncomeExpense;