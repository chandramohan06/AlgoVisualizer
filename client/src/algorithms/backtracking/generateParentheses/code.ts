export const parenthesesJavaCode = `
import java.util.*;

class GenerateParentheses {
    public List<String> generateParentheses(int n) {
        List<String> result = new ArrayList<>();
        backtrack("", 0, 0, n, result);
        return result;
    }

    private void backtrack(String current, int open, int close, int max, List<String> result) {
        if (current.length() == max * 2) {
            result.add(current);
            return;
        }

        if (open < max) {
            backtrack(current + "(", open + 1, close, max, result);
        }
        
        if (close < open) {
            backtrack(current + ")", open, close + 1, max, result);
        }
    }
}
`;

export const parenthesesCppCode = `
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class GenerateParentheses {
    void backtrack(string current, int open, int close, int max, vector<string>& result) {
        if (current.length() == max * 2) {
            result.push_back(current);
            return;
        }

        if (open < max) {
            backtrack(current + "(", open + 1, close, max, result);
        }

        if (close < open) {
            backtrack(current + ")", open, close + 1, max, result);
        }
    }

public:
    vector<string> generateParentheses(int n) {
        vector<string> result;
        backtrack("", 0, 0, n, result);
        return result;
    }
};
`;

export const parenthesesPseudoCode = `
FUNCTION generateParentheses(n):
    result = []
    backtrack("", 0, 0, n, result)
    RETURN result

FUNCTION backtrack(current, open, close, max, result):
    IF current.length == max * 2:
        result.add(current)
        RETURN
    IF open < max:
        backtrack(current + "(", open + 1, close, max, result)
    IF close < open:
        backtrack(current + ")", open, close + 1, max, result)
`;
