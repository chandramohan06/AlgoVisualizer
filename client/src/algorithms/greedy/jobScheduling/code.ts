export const jobJavaCode = `
import java.util.ArrayList;

class Job {
    char id;
    int deadline;
    int profit;

    public Job(char id, int deadline, int profit) {
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }
}

class JobScheduling {
    public void printJobScheduling(ArrayList<Job> arr, int maxTime) {
        // Assume elements are sorted by profit descending
        int n = arr.size();
        boolean[] slotsFilled = new boolean[maxTime];
        char[] resultJobs = new char[maxTime];

        for (int i = 0; i < n; i++) {
            for (int j = Math.min(maxTime - 1, arr.get(i).deadline - 1); j >= 0; j--) {
                if (slotsFilled[j] == false) {
                    slotsFilled[j] = true;
                    resultJobs[j] = arr.get(i).id;
                    break;
                }
            }
        }
    }
}
`;

export const jobCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Job {
    char id;
    int deadline;
    int profit;
};

void printJobScheduling(vector<Job>& arr, int maxTime) {
    // Assume sorted by profit descending
    int n = arr.size();
    vector<bool> slots(maxTime, false);
    vector<char> result(maxTime);

    for (int i = 0; i < n; i++) {
        for (int j = min(maxTime - 1, arr[i].deadline - 1); j >= 0; j--) {
            if (!slots[j]) {
                slots[j] = true;
                result[j] = arr[i].id;
                break;
            }
        }
    }
}
`;

export const jobPseudoCode = `
FUNCTION jobScheduling(jobs, maxTime):
    // Assume jobs sorted by profit descending
    slots = array of size maxTime filled with false
    result = array of size maxTime
    
    FOR i FROM 0 TO jobs.length - 1:
        FOR j FROM min(maxTime - 1, jobs[i].deadline - 1) DOWNTO 0:
            IF slots[j] == false:
                slots[j] = true
                result[j] = jobs[i].id
                BREAK
    RETURN result
`;
