export const priorityQueueJavaCode = `
import java.util.*;

class PriorityQueue {
    private List<Integer> heap;

    public PriorityQueue() {
        heap = new ArrayList<>();
    }

    public void insert(int val) {
        heap.add(val);
        heapifyUp(heap.size() - 1);
    }

    public int extractMin() {
        if (heap.isEmpty()) return -1;
        int min = heap.get(0);
        int last = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, last);
            heapifyDown(0);
        }
        return min;
    }

    public int extractMax() {
        if (heap.isEmpty()) return -1;
        int maxIdx = 0;
        for (int i = 1; i < heap.size(); i++) {
            if (heap.get(i) > heap.get(maxIdx)) {
                maxIdx = i;
            }
        }
        int max = heap.get(maxIdx);
        int last = heap.remove(heap.size() - 1);
        if (maxIdx < heap.size()) {
            heap.set(maxIdx, last);
            heapifyDown(maxIdx);
            heapifyUp(maxIdx);
        }
        return max;
    }

    public int peek() {
        if (heap.isEmpty()) return -1;
        return heap.get(0);
    }

    private void heapifyUp(int idx) {
        while (idx > 0) {
            int p = (idx - 1) / 2;
            if (heap.get(idx) < heap.get(p)) {
                swap(idx, p);
                idx = p;
            } else break;
        }
    }

    private void heapifyDown(int idx) {
        int size = heap.size();
        while (true) {
            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            int smallest = idx;
            if (left < size && heap.get(left) < heap.get(smallest)) smallest = left;
            if (right < size && heap.get(right) < heap.get(smallest)) smallest = right;
            if (smallest != idx) {
                swap(idx, smallest);
                idx = smallest;
            } else break;
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
}
`;

export const priorityQueueCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class PriorityQueue {
    vector<int> heap;

    void heapifyUp(int idx) {
        while (idx > 0) {
            int p = (idx - 1) / 2;
            if (heap[idx] < heap[p]) {
                swap(heap[idx], heap[p]);
                idx = p;
            } else break;
        }
    }

    void heapifyDown(int idx) {
        int size = heap.size();
        while (true) {
            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            int smallest = idx;
            if (left < size && heap[left] < heap[smallest]) smallest = left;
            if (right < size && heap[right] < heap[smallest]) smallest = right;
            if (smallest != idx) {
                swap(heap[idx], heap[smallest]);
                idx = smallest;
            } else break;
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        heapifyUp(heap.size() - 1);
    }

    int extractMin() {
        if (heap.empty()) return -1;
        int minVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) heapifyDown(0);
        return minVal;
    }

    int extractMax() {
        if (heap.empty()) return -1;
        int maxIdx = 0;
        for (int i = 1; i < heap.size(); i++) {
            if (heap[i] > heap[maxIdx]) maxIdx = i;
        }
        int maxVal = heap[maxIdx];
        heap[maxIdx] = heap.back();
        heap.pop_back();
        if (maxIdx < heap.size()) {
            heapifyDown(maxIdx);
            heapifyUp(maxIdx);
        }
        return maxVal;
    }

    int peek() {
        if (heap.empty()) return -1;
        return heap[0];
    }
};
`;

export const priorityQueuePseudoCode = `
FUNCTION insert(value):
    heap.add(value)
    heapifyUp(heap.size() - 1)

FUNCTION extractMin():
    IF heap is empty: RETURN -1
    minVal = heap[0]
    heap[0] = heap.removeLast()
    IF heap is NOT empty:
        heapifyDown(0)
    RETURN minVal

FUNCTION extractMax():
    IF heap is empty: RETURN -1
    maxIdx = findIndexofMaxElementInHeap()
    maxVal = heap[maxIdx]
    heap[maxIdx] = heap.removeLast()
    IF maxIdx < heap.size():
        heapifyDown(maxIdx)
        heapifyUp(maxIdx)
    RETURN maxVal
`;
