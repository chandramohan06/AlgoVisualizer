export const binaryHeapJavaCode = `
class MinHeap {
    private int[] heap;
    private int size;
    private int capacity;
    
    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }
    
    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }
    
    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
    
    public void insert(int value) {
        if (size == capacity) return;
        heap[size] = value;
        size++;
        heapifyUp(size - 1);
    }
    
    private void heapifyUp(int i) {
        while (i > 0 && heap[parent(i)] > heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    public int extract() {
        if (size == 0) return Integer.MIN_VALUE;
        int root = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapifyDown(0);
        return root;
    }
    
    private void heapifyDown(int i) {
        int smallest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < size && heap[left] < heap[smallest])
            smallest = left;
        
        if (right < size && heap[right] < heap[smallest])
            smallest = right;
        
        if (smallest != i) {
            swap(i, smallest);
            heapifyDown(smallest);
        }
    }
    
    public int peek() {
        return size == 0 ? Integer.MIN_VALUE : heap[0];
    }
    
    public void buildHeap(int[] arr) {
        this.heap = arr;
        this.size = arr.length;
        this.capacity = arr.length;
        
        for (int i = size / 2 - 1; i >= 0; i--) {
            heapifyDown(i);
        }
    }
}
`;

export const binaryHeapCppCode = `
class MinHeap {
private:
    int* heap;
    int size;
    int capacity;
    
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
public:
    MinHeap(int cap) {
        capacity = cap;
        size = 0;
        heap = new int[capacity];
    }
    
    void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
    
    void insert(int value) {
        if (size == capacity) return;
        heap[size] = value;
        size++;
        heapifyUp(size - 1);
    }
    
    void heapifyUp(int i) {
        while (i > 0 && heap[parent(i)] > heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    int extract() {
        if (size == 0) return INT_MIN;
        int root = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapifyDown(0);
        return root;
    }
    
    void heapifyDown(int i) {
        int smallest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < size && heap[left] < heap[smallest])
            smallest = left;
        
        if (right < size && heap[right] < heap[smallest])
            smallest = right;
        
        if (smallest != i) {
            swap(i, smallest);
            heapifyDown(smallest);
        }
    }
    
    int peek() {
        return size == 0 ? INT_MIN : heap[0];
    }
    
    void buildHeap(int* arr, int n) {
        heap = arr;
        size = n;
        capacity = n;
        
        for (int i = size / 2 - 1; i >= 0; i--) {
            heapifyDown(i);
        }
    }
};
`;

export const binaryHeapPseudoCode = `
FUNCTION parent(i):
    RETURN (i - 1) / 2

FUNCTION leftChild(i):
    RETURN 2 * i + 1

FUNCTION rightChild(i):
    RETURN 2 * i + 2

FUNCTION swap(i, j):
    temp = heap[i]
    heap[i] = heap[j]
    heap[j] = temp

FUNCTION insert(value):
    IF size == capacity:
        RETURN
    heap[size] = value
    size = size + 1
    heapifyUp(size - 1)

FUNCTION heapifyUp(i):
    WHILE i > 0 AND heap[parent(i)] > heap[i]:
        swap(i, parent(i))
        i = parent(i)

FUNCTION extract():
    IF size == 0:
        RETURN MIN_VALUE
    root = heap[0]
    heap[0] = heap[size - 1]
    size = size - 1
    heapifyDown(0)
    RETURN root

FUNCTION heapifyDown(i):
    smallest = i
    left = leftChild(i)
    right = rightChild(i)
    
    IF left < size AND heap[left] < heap[smallest]:
        smallest = left
    
    IF right < size AND heap[right] < heap[smallest]:
        smallest = right
    
    IF smallest != i:
        swap(i, smallest)
        heapifyDown(smallest)

FUNCTION peek():
    IF size == 0:
        RETURN MIN_VALUE
    RETURN heap[0]

FUNCTION buildHeap(arr):
    heap = arr
    size = LENGTH(arr)
    capacity = LENGTH(arr)
    
    FOR i FROM size / 2 - 1 DOWNTO 0:
        heapifyDown(i)
`;
