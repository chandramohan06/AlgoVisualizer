export const activityJavaCode = `
class ActivitySelection {
    public int selectActivities(int[] start, int[] end, int n) {
        // Assume already sorted by end times
        int count = 1;
        int lastEnd = end[0];

        for (int i = 1; i < n; i++) {
            if (start[i] >= lastEnd) {
                count++;
                lastEnd = end[i];
            }
        }
        return count;
    }
}
`;

export const activityCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int selectActivities(vector<int>& start, vector<int>& end) {
    // Assume sorted by end times
    int count = 1;
    int lastEnd = end[0];

    for (int i = 1; i < start.size(); i++) {
        if (start[i] >= lastEnd) {
            count++;
            lastEnd = end[i];
        }
    }
    return count;
}
`;

export const activityPseudoCode = `
FUNCTION selectActivities(start, end):
    // Assume sorted by end times
    count = 1
    lastEnd = end[0]
    FOR i FROM 1 TO start.length - 1:
        IF start[i] >= lastEnd:
            count = count + 1
            lastEnd = end[i]
    RETURN count
`;
