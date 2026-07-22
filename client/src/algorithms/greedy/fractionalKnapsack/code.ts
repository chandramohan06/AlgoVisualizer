export const fractionalKnapsackJavaCode = `
class FractionalKnapsack {
    public double getMaxValue(int[] wt, int[] val, int capacity) {
        // Assume elements are sorted by value/weight ratio descending
        double totalValue = 0.0;

        for (int i = 0; i < wt.length; i++) {
            if (capacity - wt[i] >= 0) {
                capacity -= wt[i];
                totalValue += val[i];
            } else {
                double fraction = ((double) capacity / wt[i]);
                totalValue += (val[i] * fraction);
                break; // knapsack full
            }
        }
        return totalValue;
    }
}
`;

export const fractionalKnapsackCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

double getMaxValue(vector<int>& wt, vector<int>& val, int capacity) {
    // Assume sorted by ratio descending
    double totalValue = 0.0;

    for (int i = 0; i < wt.size(); i++) {
        if (capacity - wt[i] >= 0) {
            capacity -= wt[i];
            totalValue += val[i];
        } else {
            double fraction = (double)capacity / wt[i];
            totalValue += val[i] * fraction;
            break;
        }
    }
    return totalValue;
}
`;

export const fractionalKnapsackPseudoCode = `
FUNCTION getMaxValue(wt, val, capacity):
    // Assume sorted by ratio descending
    totalValue = 0.0
    FOR i FROM 0 TO wt.length - 1:
        IF capacity - wt[i] >= 0:
            capacity = capacity - wt[i]
            totalValue = totalValue + val[i]
        ELSE:
            fraction = capacity / wt[i]
            totalValue = totalValue + val[i] * fraction
            BREAK
    RETURN totalValue
`;
