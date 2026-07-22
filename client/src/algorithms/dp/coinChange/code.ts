export const coinChangeJavaCode = `
import java.util.Arrays;

class CoinChange {
    public int solveCoinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}
`;

export const coinChangeCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int solveCoinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}
`;

export const coinChangePseudoCode = `
FUNCTION solveCoinChange(coins, amount):
    dp = array of size amount + 1 filled with INFINITY
    dp[0] = 0
    FOR i FROM 1 TO amount:
        FOR each coin IN coins:
            IF coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    RETURN dp[amount] > amount ? -1 : dp[amount]
`;
