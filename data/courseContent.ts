import { Topic } from '../types';

export const COURSE_TOPICS: Topic[] = [
  {
    id: 'oop-basics',
    title: 'Objects & Classes: Complete Guide',
    category: 'OOP',
    description: 'What objects and classes are and how they are used in Kotlin.',
    sections: [
      {
        title: 'What is a Class?',
        content: '**A Class is a blueprint/template** that defines the structure and behavior of objects. It describes:\n\n1. **Properties (State)**: Variables that hold data (`val name: String`)\n2. **Methods (Behavior)**: Functions that operate on data (`fun drive()`)\n3. **Constructors**: Special methods for initialization\n\n**Key Points for Exam:**\n- Classes are **final by default** in Kotlin (cannot be inherited)\n- Use `open` keyword to allow inheritance\n- Class metadata is stored in **Metaspace** (JVM memory area)'
      },
      {
        title: 'What is an Object?',
        content: '**An Object is an instance of a class** - a concrete realization of the blueprint with actual values.\n\n**Memory Allocation:**\n- Objects live on the **Heap** memory\n- References (variables) live on the **Stack**\n- Object Header contains: hash code, GC age, lock state\n\n**Object Creation Steps:**\n1. Memory allocation in Heap\n2. Default values initialization\n3. Constructor execution',
        codeSnippet: {
          language: 'kotlin',
          code: `// Class definition (blueprint)
class Car(val brand: String, var speed: Int) {
    fun accelerate() { speed += 10 }
}

// Object creation (instance)
val myCar = Car("Toyota", 0)  // myCar is reference on Stack
                                // Car object is on Heap
myCar.accelerate()
println(myCar.speed) // 10`
        }
      },
      {
        title: 'Primary & Secondary Constructors',
        content: '**Primary Constructor** - declared in class header:\n```kotlin\nclass Person(val name: String, var age: Int)\n```\n\n**Secondary Constructor** - additional constructors with `constructor` keyword:\n```kotlin\nclass Person(val name: String) {\n    constructor(name: String, age: Int) : this(name) { }\n}\n```\n\n**Init Block** - runs after primary constructor:\n```kotlin\nclass Person(val name: String) {\n    init { println("Person created: $name") }\n}\n```'
      },
      {
        title: 'Companion Objects (Static in Kotlin)',
        content: '**Companion Object** = Kotlins way of having static members.\n\n**Key Difference from Java static:**\n- Companion object is a **real singleton instance** on the Heap\n- Java statics are just class-level members, not objects\n\n```kotlin\nclass MyClass {\n    companion object {\n        const val MAX = 100  // compile-time constant\n        fun create(): MyClass = MyClass()\n    }\n}\nval obj = MyClass.create()\n```'
      }
    ],
    quiz: [
      {
        question: "Where is the object stored in memory when you write: val car = Car()?",
        options: ["Stack only", "Heap only", "Reference on Stack, object on Heap", "Metaspace"],
        correctIndex: 2,
        explanation: "The reference variable 'car' is stored on the Stack, while the actual Car object is allocated on the Heap."
      },
      {
        question: "What makes Kotlin classes different from Java classes by default?",
        options: ["They are open by default", "They are final by default", "They are abstract by default", "They are sealed by default"],
        correctIndex: 1,
        explanation: "Kotlin classes are final by default - you must explicitly mark them 'open' to allow inheritance."
      },
      {
        question: "What is the purpose of the 'init' block in Kotlin?",
        options: ["To define static methods", "To execute code after primary constructor", "To declare properties", "To define secondary constructors"],
        correctIndex: 1,
        explanation: "The init block runs immediately after the primary constructor and is used for initialization logic."
      },
      {
        question: "How does Kotlin's companion object differ from Java's static members?",
        options: ["No difference", "Companion object is a real object instance", "Static is faster", "Companion object cannot have functions"],
        correctIndex: 1,
        explanation: "Companion object is an actual singleton object instance allocated on the Heap, while Java statics are class-level members."
      },
      {
        question: "What keyword must you use to allow a Kotlin class to be inherited?",
        options: ["abstract", "open", "public", "inherit"],
        correctIndex: 1,
        explanation: "The 'open' keyword must be used to allow a class to be inherited in Kotlin."
      }
    ]
  },
  {
    id: 'class-types',
    title: 'Class Types: Class vs Abstract vs Interface',
    category: 'OOP',
    description: 'Differences between a class, an abstract class, and an interface.',
    sections: [
      {
        title: 'Regular Class',
        content: '**Regular Class** - A complete blueprint that can be instantiated.\n\n**Characteristics:**\n- Can have state (properties with backing fields)\n- Can have implemented methods\n- Final by default in Kotlin\n- Single inheritance only\n\n```kotlin\nclass Dog(val name: String) {\n    fun bark() = println("Woof!")\n}\nval dog = Dog("Rex") // Can create instance\n```'
      },
      {
        title: 'Abstract Class',
        content: '**Abstract Class** - A partial implementation that CANNOT be instantiated.\n\n**Key Characteristics:**\n- **CAN hold state** (properties with backing fields)\n- Can have abstract methods (no implementation)\n- Can have concrete methods (with implementation)\n- **Single inheritance** only\n- Use when classes share **IS-A relationship**\n\n**When to use:**\n- Related classes need shared state\n- You need constructors\n- Base implementation with some abstract parts',
        codeSnippet: {
          language: 'kotlin',
          code: `abstract class Animal(val name: String) {  // Has state!
    abstract fun makeSound()  // Must be implemented
    
    fun eat() = println("$name is eating")  // Concrete method
}

class Dog(name: String) : Animal(name) {
    override fun makeSound() = println("Woof!")
}

// val animal = Animal("X") // ERROR! Cannot instantiate
val dog = Dog("Rex")  // OK`
        }
      },
      {
        title: 'Interface',
        content: '**Interface** - A pure behavioral contract.\n\n**Key Characteristics:**\n- **CANNOT hold state** (no backing fields)\n- Can have abstract methods\n- Can have default implementations (Kotlin/Java 8+)\n- **Multiple inheritance** allowed!\n- Use when classes share **CAN-DO relationship**\n\n**Why no state?** To avoid the **Diamond Problem** - conflicts when inheriting state from multiple sources.\n\n**When to use:**\n- Define capabilities/behaviors\n- Need multiple inheritance\n- No shared state needed',
        codeSnippet: {
          language: 'kotlin',
          code: `interface Flyable {
    fun fly()  // Abstract
    fun land() = println("Landing...")  // Default impl
}

interface Swimmable {
    fun swim()
}

// Multiple inheritance!
class Duck : Flyable, Swimmable {
    override fun fly() = println("Flying!")
    override fun swim() = println("Swimming!")
}`
        }
      },
      {
        title: 'Comparison Table (EXAM CRITICAL)',
        content: '| Feature | Class | Abstract Class | Interface |\n|---------|-------|----------------|-----------|\n| Instantiate? | ✅ Yes | ❌ No | ❌ No |\n| Hold State? | ✅ Yes | ✅ Yes | ❌ No |\n| Constructors? | ✅ Yes | ✅ Yes | ❌ No |\n| Multiple Inherit? | ❌ No | ❌ No | ✅ Yes |\n| Default Methods? | ✅ Yes | ✅ Yes | ✅ Yes |\n| Relationship | - | IS-A | CAN-DO |'
      }
    ],
    quiz: [
      {
        question: "What is the KEY difference between abstract class and interface regarding state?",
        options: ["No difference", "Abstract class CAN hold state, interface CANNOT", "Interface CAN hold state, abstract class CANNOT", "Both cannot hold state"],
        correctIndex: 1,
        explanation: "Abstract classes can have properties with backing fields (state), while interfaces cannot hold state to avoid the Diamond Problem."
      },
      {
        question: "How many interfaces can a Kotlin class implement?",
        options: ["Only one", "Maximum two", "Unlimited", "Same as abstract classes"],
        correctIndex: 2,
        explanation: "A class can implement unlimited interfaces, but can only extend one class (abstract or regular)."
      },
      {
        question: "When should you use an interface over an abstract class?",
        options: ["When you need constructors", "When you need shared state", "When you need multiple inheritance or define capabilities", "When you need faster code"],
        correctIndex: 2,
        explanation: "Interfaces allow multiple inheritance and are used to define capabilities (CAN-DO). Use abstract class when you need shared state (IS-A)."
      },
      {
        question: "What is the Diamond Problem?",
        options: ["A graphics issue", "Conflict when inheriting same state from multiple sources", "A memory leak", "A compilation error"],
        correctIndex: 1,
        explanation: "The Diamond Problem occurs when a class inherits from multiple sources that have the same property/state, causing ambiguity."
      },
      {
        question: "Can interfaces in Kotlin have method implementations?",
        options: ["No, never", "Yes, default implementations are allowed", "Only in Java 8+", "Only abstract methods"],
        correctIndex: 1,
        explanation: "Kotlin interfaces can have default method implementations, similar to Java 8+ interfaces."
      }
    ]
  },
  {
    id: 'inheritance',
    title: 'Inheritance: How It Works',
    category: 'OOP',
    description: 'What inheritance is and how it works in Kotlin.',
    sections: [
      {
        title: 'What is Inheritance?',
        content: '**Inheritance** is a mechanism where a new class (child/subclass) acquires properties and behaviors from an existing class (parent/superclass).\n\n**Benefits:**\n- Code reuse\n- Polymorphism\n- Hierarchical classification\n\n**Kotlin Rules:**\n- Classes are **final by default** - use `open` to allow inheritance\n- Methods are **final by default** - use `open` to allow override\n- Use `override` keyword when overriding'
      },
      {
        title: 'Inheritance Syntax',
        content: '```kotlin\n// Parent class - must be "open"\nopen class Animal(val name: String) {\n    open fun makeSound() = println("Sound")\n}\n\n// Child class\nclass Dog(name: String) : Animal(name) {\n    override fun makeSound() = println("Woof!")\n}\n```\n\n**Key Points:**\n- Use `:` instead of `extends`\n- Call parent constructor after `:`\n- Use `super` to access parent members'
      },
      {
        title: 'Super Keyword & Constructor Chain',
        content: '**Constructor Execution Order:**\n1. Parent constructor runs FIRST\n2. Child init blocks run\n3. Child constructor runs\n\n**EXAM WARNING:** If parent calls overridden method in constructor, the child method runs with UNINITIALIZED child properties!',
        codeSnippet: {
          language: 'kotlin',
          code: `open class Parent {
    open val value: Int = 1
    init { println("Parent value: $value") }  // Calls child's!
}

class Child : Parent() {
    override val value: Int = 2
}

// Output: "Parent value: 0" (not 2! Child not initialized yet)`
        }
      },
      {
        title: 'Polymorphism & Dynamic Dispatch',
        content: '**Polymorphism** = "many forms" - one interface, multiple implementations.\n\n**How it works (vtable):**\n1. Each class has a Virtual Method Table\n2. When you call `animal.makeSound()`, JVM looks up the ACTUAL type\'s vtable\n3.Calls the correct implementation at runtime\n\n```kotlin\nval animals: List<Animal> = listOf(Dog("Rex"), Cat("Tom"))\nanimals.forEach { it.makeSound() }  // Correct method called!\n```'
      }
    ],
    quiz: [
      {
        question: "Why are Kotlin classes final by default?",
        options: ["Performance", "To enforce explicit design for inheritance", "Kotlin limitation", "Memory optimization"],
        correctIndex: 1,
        explanation: "Kotlin follows 'Effective Java' principle: design for inheritance or prohibit it. The 'open' keyword forces explicit decision."
      },
      {
        question: "In what order do constructors execute?",
        options: ["Child first, then parent", "Parent first, then child", "Both simultaneously", "Random order"],
        correctIndex: 1,
        explanation: "Parent constructor always executes before child constructor. This can cause issues with overridden properties."
      },
      {
        question: "What is a vtable (Virtual Method Table)?",
        options: ["Database table", "Table mapping methods to their actual implementations for polymorphism", "Memory allocation table", "Variable table"],
        correctIndex: 1,
        explanation: "vtable is a runtime structure that enables polymorphism by mapping method calls to correct implementations based on actual type."
      },
      {
        question: "What happens if parent constructor calls an overridden method?",
        options: ["Compilation error", "Parent method runs", "Child method runs with uninitialized state", "Runtime error"],
        correctIndex: 2,
        explanation: "The child's overridden method runs, but child properties are not yet initialized, leading to null/zero values!"
      }
    ]
  },
  {
    id: 'data-enum',
    title: 'Data Classes vs Enum Classes',
    category: 'Kotlin',
    description: 'When and why to use data classes vs enum classes.',
    sections: [
      {
        title: 'Data Classes',
        content: '**Data Class** = Class designed to hold data.\n\n**Auto-generated methods:**\n1. `equals()` - value-based comparison\n2. `hashCode()` - for HashMap/HashSet\n3. `toString()` - readable representation\n4. `copy()` - create modified copy\n5. `componentN()` - for destructuring\n\n**Requirements:**\n- At least one property in primary constructor\n- Cannot be abstract, open, sealed, or inner',
        codeSnippet: {
          language: 'kotlin',
          code: `data class User(val name: String, val age: Int)

val user1 = User("John", 25)
val user2 = User("John", 25)

println(user1 == user2)      // true (value comparison)
println(user1.toString())    // "User(name=John, age=25)"

val user3 = user1.copy(age = 26)  // Copy with modification
val (name, age) = user1           // Destructuring`
        }
      },
      {
        title: 'Enum Classes',
        content: '**Enum Class** = Fixed set of constants/instances.\n\n**Characteristics:**\n- Each enum entry is a **SINGLETON**\n- Finite, predefined values\n- Can have properties and methods\n- Exhaustive in `when` expressions\n\n**Memory:** Entries are static final instances created once',
        codeSnippet: {
          language: 'kotlin',
          code: `enum class Status(val code: Int) {
    PENDING(0),
    APPROVED(1),
    REJECTED(2);
    
    fun isPositive() = this == APPROVED
}

val status = Status.PENDING
when (status) {  // Exhaustive - must cover all cases
    Status.PENDING -> println("Waiting")
    Status.APPROVED -> println("OK")
    Status.REJECTED -> println("No")
}`
        }
      },
      {
        title: 'When to Use Which (EXAM CRITICAL)',
        content: '| Use Case | Data Class | Enum Class |\n|----------|------------|------------|\n| Hold varying data | ✅ | ❌ |\n| Fixed set of values | ❌ | ✅ |\n| Multiple instances | ✅ | ❌ (singletons) |\n| Exhaustive when | ❌ | ✅ |\n| State comparison | Value-based | Reference-based |\n\n**Examples:**\n- User, Product, Order → **Data Class**\n- Status, Direction, Color → **Enum Class**'
      },
      {
        title: 'Sealed Classes (Bonus)',
        content: '**Sealed Class** = Restricted class hierarchy.\n\n**Best of both worlds:**\n- Exhaustive `when` (like enum)\n- Can have multiple instances with state (like data class)\n\n```kotlin\nsealed class Result {\n    data class Success(val data: String) : Result()\n    data class Error(val message: String) : Result()\n    object Loading : Result()\n}\n```'
      }
    ],
    quiz: [
      {
        question: "What methods does a data class automatically generate?",
        options: ["Only toString()", "equals(), hashCode(), toString(), copy(), componentN()", "Only copy()", "None, you must write them"],
        correctIndex: 1,
        explanation: "Data classes auto-generate: equals(), hashCode(), toString(), copy(), and componentN() functions."
      },
      {
        question: "Are enum entries singletons or multiple instances?",
        options: ["Multiple instances", "Singletons", "Depends on usage", "Abstract instances"],
        correctIndex: 1,
        explanation: "Each enum entry is a static final singleton - only one instance exists for each enum constant."
      },
      {
        question: "When is 'when' expression exhaustive?",
        options: ["Always", "When using enum or sealed class", "Never", "Only with else branch"],
        correctIndex: 1,
        explanation: "When expression is exhaustive (must cover all cases) when used with enum or sealed class."
      },
      {
        question: "What is the difference between data class copy() and a deep copy?",
        options: ["No difference", "copy() is shallow - copies references not nested objects", "copy() is deep", "copy() creates new type"],
        correctIndex: 1,
        explanation: "copy() performs SHALLOW copy - it copies primitive values but nested objects are shared (same reference)."
      },
      {
        question: "What requirement must a Kotlin data class primary constructor meet?",
        options: ["It must be empty", "It must have at least one parameter marked val or var", "It must declare a no-arg constructor", "It must extend an interface"],
        correctIndex: 1,
        explanation: "A data class must have at least one parameter in the primary constructor, and all such parameters must be marked val or var."
      },
      {
        question: "Can a Kotlin data class be declared open?",
        options: ["Yes, data classes are open by default", "Yes, but only in the same file", "No, data classes cannot be open/abstract/sealed/inner", "Only with a compiler flag"],
        correctIndex: 2,
        explanation: "Kotlin forbids marking a data class as open, abstract, sealed, or inner; data classes are intended for simple value holders."
      },
      {
        question: "What does copy() do for a data class?",
        options: ["Deep-copies the entire object graph", "Creates a new instance with optional changed properties (shallow for references)", "Copies methods into a subclass", "Copies bytecode at runtime"],
        correctIndex: 1,
        explanation: "copy() returns a new instance where you can override selected properties; referenced objects are not deep-cloned automatically."
      },
      {
        question: "Which operator checks referential equality in Kotlin?",
        options: ["==", "!=", "===", "equals()"],
        correctIndex: 2,
        explanation: "== calls equals() (structural equality). === checks whether two references point to the exact same object."
      },
      {
        question: "When is an enum class a better choice than a sealed class?",
        options: ["When you have a fixed, closed set of simple constants", "When each case needs different payload types", "When you need to create cases at runtime", "When you need multiple inheritance"],
        correctIndex: 0,
        explanation: "Enums are great for a small, fixed set of named constants. Sealed classes shine when cases carry different data and you want exhaustive when checks."
      },
      {
        question: "What makes sealed classes powerful with when expressions?",
        options: ["They always run faster than enums", "The compiler can check exhaustiveness without an else branch", "They allow multiple inheritance", "They automatically serialize to JSON"],
        correctIndex: 1,
        explanation: "Because the set of subclasses is restricted, the compiler can often prove that a when covers all cases and require no else."
      },
      {
        question: "Can enum classes have constructors and per-entry properties?",
        options: ["No, enums can only list names", "Yes, each entry can pass arguments to the enum constructor", "Only in Java, not in Kotlin", "Only with reflection"],
        correctIndex: 1,
        explanation: "Kotlin enums can define a constructor and properties; each entry can supply its own arguments and even override members."
      },
      {
        question: "For representing API response states (Success/Error/Loading), what is best?",
        options: ["Data class", "Enum class", "Sealed class", "Regular class"],
        correctIndex: 2,
        explanation: "Sealed class is ideal - provides exhaustive when AND allows each state to carry different data."
      }
    ]
  },
  {
    id: 'async',
    title: 'Threads vs Coroutines',
    category: 'Kotlin',
    description: 'Differences between threads and coroutines in asynchronous programming.',
    sections: [
      {
        title: 'What is Asynchronous Programming?',
        content: '**Asynchronous Programming** = Executing tasks without blocking the main thread.\n\n**Why needed in Android:**\n- Main thread = UI thread (60 FPS = 16ms per frame)\n- Long operations (network, DB) block UI → ANR (App Not Responding)\n- Solution: Run heavy work on background threads/coroutines'
      },
      {
        title: 'Threads',
        content: '**Thread** = OS-managed unit of execution.\n\n**Characteristics:**\n- Managed by operating system kernel\n- Each thread has ~1-2MB stack memory\n- Context switching is **expensive** (microseconds)\n- Limited number (~thousands cause OOM)\n\n**Problems:**\n- Memory hungry\n- Expensive context switches\n- Complex callback management',
        codeSnippet: {
          language: 'kotlin',
          code: `// Creating a thread
Thread {
    // Runs on background thread
    val result = heavyOperation()
    
    // Must switch back to main thread for UI
    runOnUiThread {
        textView.text = result
    }
}.start()`
        }
      },
      {
        title: 'Coroutines',
        content: '**Coroutine** = Lightweight, suspendable computation.\n\n**Key Differences from Threads:**\n- **User-space** managed (not OS)\n- **Lightweight** - ~few bytes vs 1MB\n- **Suspendable** - can pause without blocking thread\n- Can run **millions** on few threads\n\n**How Suspension Works:**\n1. At `suspend` point, state is saved\n2. Thread is released for other work\n3. When ready, coroutine resumes (possibly on different thread)',
        codeSnippet: {
          language: 'kotlin',
          code: `// Coroutine - lightweight and suspendable
lifecycleScope.launch {
    // Runs on main thread but doesn't block
    val result = withContext(Dispatchers.IO) {
        // Switches to IO thread for heavy work
        heavyOperation()
    }
    // Back on main thread automatically
    textView.text = result
}`
        }
      },
      {
        title: 'Dispatchers (EXAM CRITICAL)',
        content: '**Dispatchers** determine which thread coroutine runs on:\n\n| Dispatcher | Thread Pool | Use For |\n|------------|-------------|---------|\n| `Main` | Main/UI thread | UI updates |\n| `IO` | Shared pool (64+ threads) | Network, DB, file I/O |\n| `Default` | CPU cores count | Heavy computation |\n| `Unconfined` | Caller thread | Testing only |\n\n```kotlin\nwithContext(Dispatchers.IO) { networkCall() }\nwithContext(Dispatchers.Default) { imageProcess() }\n```'
      },
      {
        title: 'Comparison Table',
        content: '| Feature | Thread | Coroutine |\n|---------|--------|-----------|\n| Memory | ~1-2MB stack | ~few bytes |\n| Managed by | OS Kernel | User space |\n| Context switch | Expensive (µs) | Cheap (ns) |\n| Max count | Thousands | Millions |\n| Blocking | Blocks thread | Suspends (non-blocking) |\n| Syntax | Callbacks | Sequential |'
      }
    ],
    quiz: [
      {
        question: "What is the main advantage of coroutines over threads?",
        options: ["Faster execution", "Lightweight - can create millions without memory issues", "Easier to debug", "Better security"],
        correctIndex: 1,
        explanation: "Coroutines are extremely lightweight (bytes vs MB), allowing millions to run on few threads."
      },
      {
        question: "What does 'suspend' mean in coroutines?",
        options: ["Terminate execution", "Pause execution without blocking thread", "Block the thread", "Create new thread"],
        correctIndex: 1,
        explanation: "Suspend means pause execution, save state, and release thread for other work. Resume later when ready."
      },
      {
        question: "Which Dispatcher should you use for network calls?",
        options: ["Main", "IO", "Default", "Unconfined"],
        correctIndex: 1,
        explanation: "Dispatchers.IO is optimized for I/O operations (network, database, file operations)."
      },
      {
        question: "Which Dispatcher for heavy CPU calculations?",
        options: ["Main", "IO", "Default", "Unconfined"],
        correctIndex: 2,
        explanation: "Dispatchers.Default uses thread pool sized to CPU cores, optimized for CPU-intensive work."
      },
      {
        question: "What is structured concurrency in Kotlin coroutines?",
        options: ["A way to organize threads into groups", "Coroutines are launched in a scope so their lifetime is tied to a parent Job", "Always using Dispatchers.Default", "Disabling cancellation for performance"],
        correctIndex: 1,
        explanation: "Structured concurrency means child coroutines are bound to a scope/parent job: failures and cancellation propagate, and work doesn't leak past the scope."
      },
      {
        question: "Why is GlobalScope usually discouraged in Android UI code?",
        options: ["It is slower than lifecycleScope", "It can outlive the screen lifecycle and cause leaks/unwanted work", "It cannot call suspend functions", "It only runs on the main thread"],
        correctIndex: 1,
        explanation: "GlobalScope is tied to the app process, not a UI lifecycle. Work may continue after an Activity/Fragment is destroyed."
      },
      {
        question: "What happens when you cancel a coroutine Job?",
        options: ["The underlying thread is killed immediately", "Cancellation is cooperative and usually happens at suspension points/checks", "Nothing happens; cancellation is ignored", "The coroutine restarts automatically"],
        correctIndex: 1,
        explanation: "Coroutine cancellation is cooperative: suspending calls are cancellable and code should be written to respond to cancellation."
      },
      {
        question: "What is the purpose of withContext(Dispatchers.IO)?",
        options: ["Launch a fire-and-forget coroutine", "Switch execution to the IO dispatcher and return a result", "Create a new thread every time", "Block the main thread until IO finishes"],
        correctIndex: 1,
        explanation: "withContext changes the coroutine context (e.g., dispatcher) for the block and suspends until it completes, returning its result."
      },
      {
        question: "Which coroutine builder blocks the current thread until completion?",
        options: ["launch", "async", "runBlocking", "withContext"],
        correctIndex: 2,
        explanation: "runBlocking is mainly for tests/main functions. It blocks the calling thread until the coroutine finishes."
      },
      {
        question: "What is the key difference between launch and async?",
        options: ["async returns Deferred<T>; launch returns Job", "launch can’t be cancelled", "async always runs on IO", "launch blocks but async doesn’t"],
        correctIndex: 0,
        explanation: "launch is for side-effects and returns a Job. async is for concurrent computation and returns a Deferred<T> that you can await."
      },
      {
        question: "Where should UI updates happen when using coroutines on Android?",
        options: ["Dispatchers.IO", "Dispatchers.Default", "Dispatchers.Main", "Dispatchers.Unconfined"],
        correctIndex: 2,
        explanation: "UI updates must happen on the main thread. Use Dispatchers.Main (or return to main after withContext(IO/Default))."
      },
      {
        question: "How much memory does a thread typically consume?",
        options: ["Few bytes", "Few KB", "~1-2 MB", "100 MB"],
        correctIndex: 2,
        explanation: "Each thread has its own stack memory, typically around 1-2MB, which is why creating many threads causes OOM."
      }
    ]
  },
  {
    id: 'kotlin-java',
    title: 'Kotlin vs Java',
    category: 'Kotlin',
    description: 'Key differences between Kotlin and Java languages.',
    sections: [
      {
        title: 'Null Safety',
        content: '**Kotlin:** Built-in null safety at compile time\n- `String` = non-nullable (cannot be null)\n- `String?` = nullable\n- Compiler enforces null checks\n\n**Java:** No null safety\n- Any reference can be null\n- NullPointerException at runtime\n\n```kotlin\n// Kotlin\nvar name: String = "John"  // Cannot be null\nvar nullable: String? = null  // Can be null\nnullable?.length  // Safe call\nnullable!!.length  // Force - may throw NPE\n```'
      },
      {
        title: 'Data Classes & Properties',
        content: '**Kotlin Advantages:**\n- Data classes auto-generate equals, hashCode, toString, copy\n- Properties instead of fields + getters/setters\n- Primary constructor in class header\n\n```kotlin\n// Kotlin - 1 line\ndata class User(val name: String, val age: Int)\n\n// Java - ~50 lines\npublic class User {\n    private String name;\n    private int age;\n    // constructor, getters, setters, equals, hashCode, toString...\n}\n```'
      },
      {
        title: 'Extension Functions',
        content: '**Kotlin unique feature:** Add methods to existing classes without inheritance.\n\n```kotlin\n// Add function to String class\nfun String.addExclamation() = this + "!"\n\n"Hello".addExclamation()  // "Hello!"\n```\n\n**Note:** Extensions are resolved **statically** (compile-time), not dynamically.'
      },
      {
        title: 'Key Differences Table (EXAM CRITICAL)',
        content: '| Feature | Kotlin | Java |\n|---------|--------|------|\n| Null Safety | ✅ Compile-time | ❌ Runtime NPE |\n| Data Classes | ✅ Built-in | ❌ Manual/Lombok |\n| Extension Functions | ✅ Yes | ❌ No |\n| Coroutines | ✅ Native | ❌ External libs |\n| Default Final | ✅ Yes | ❌ No (open) |\n| Properties | ✅ Built-in | ❌ Fields+getters |\n| Smart Casts | ✅ Yes | ❌ No |\n| When Expression | ✅ Powerful | ⚠️ Switch limited |\n| Checked Exceptions | ❌ No | ✅ Yes |\n| Semicolons | ❌ Optional | ✅ Required |'
      },
      {
        title: 'Interoperability',
        content: '**Kotlin compiles to Java bytecode** - 100% interoperable:\n- Call Java from Kotlin\n- Call Kotlin from Java\n\n**Platform Types (Type!):** When Kotlin consumes Java without `@Nullable`/`@NonNull`, type becomes `String!` - unknown nullability.\n\n**Annotations for Java interop:**\n- `@JvmStatic` - generate real static method\n- `@JvmField` - expose as field without getter\n- `@JvmOverloads` - generate overloaded methods for default params'
      }
    ],
    quiz: [
      {
        question: "What is the main advantage of Kotlin's null safety?",
        options: ["Faster execution", "Catches null errors at compile time", "Uses less memory", "Better threading"],
        correctIndex: 1,
        explanation: "Kotlin's type system catches potential null pointer exceptions at compile time, not runtime."
      },
      {
        question: "Are Kotlin extension functions resolved statically or dynamically?",
        options: ["Dynamically (runtime)", "Statically (compile time)", "Both", "Neither"],
        correctIndex: 1,
        explanation: "Extension functions are resolved statically based on declared type, not runtime type."
      },
      {
        question: "What does String! mean in Kotlin?",
        options: ["Non-nullable string", "Nullable string", "Platform type from Java with unknown nullability", "Error"],
        correctIndex: 2,
        explanation: "Platform type (Type!) comes from Java code without nullability annotations - Kotlin doesn't know if it can be null."
      },
      {
        question: "What are platform types (T!) in Kotlin?",
        options: ["Types coming from Kotlin/JS", "Java types with unknown nullability treated as 'could be nullable or not'", "Native C pointer types", "Generic star-projected types"],
        correctIndex: 1,
        explanation: "When Kotlin sees a Java type without nullability info, it treats it as a platform type (T!), meaning null-safety can't be fully enforced."
      },
      {
        question: "Does Kotlin have checked exceptions like Java?",
        options: ["Yes, all checked exceptions are enforced", "No, Kotlin does not have checked exceptions (all are unchecked)", "Only IOExceptions are checked", "Only with @Throws"],
        correctIndex: 1,
        explanation: "Kotlin does not differentiate checked/unchecked exceptions at the language level, so you are not forced to catch specific exceptions."
      },
      {
        question: "What does @JvmOverloads do?",
        options: ["Generates overloads for functions/constructors with default parameters for Java callers", "Overloads operators like + and -", "Generates equals() and hashCode()", "Optimizes coroutines bytecode"],
        correctIndex: 0,
        explanation: "@JvmOverloads generates multiple overloaded methods so Java code can call Kotlin functions that use default parameter values."
      },
      {
        question: "How does a companion object appear to Java callers by default?",
        options: ["As true static members directly on the class", "As a nested class named Companion with instance members", "As top-level functions", "It is not visible from Java"],
        correctIndex: 1,
        explanation: "Without @JvmStatic, companion members are accessed from Java via MyClass.Companion.someMethod()."
      },
      {
        question: "Which annotation makes a Kotlin companion function callable as a Java static method?",
        options: ["@Static", "@JvmStatic", "@JvmField", "@JvmName"],
        correctIndex: 1,
        explanation: "@JvmStatic generates a static method in the containing class (or object) in addition to the Companion method, improving Java interop."
      },
      {
        question: "What is SAM conversion in Kotlin (Java interop)?",
        options: ["Automatic conversion of Kotlin classes to Java classes", "Allowing a lambda where a Java single-abstract-method interface is expected", "Converting arrays to lists", "Converting suspend functions to threads"],
        correctIndex: 1,
        explanation: "For Java functional interfaces (one abstract method), Kotlin lets you pass a lambda instead of creating an anonymous class."
      },
      {
        question: "Why might Kotlin still throw a NullPointerException when calling Java code?",
        options: ["Kotlin disables null safety by default", "Platform types/incorrect annotations can hide nulls, and !! can force an NPE", "Because Kotlin uses raw pointers", "Because coroutines always run on multiple threads"],
        correctIndex: 1,
        explanation: "Java APIs can return null without annotations; Kotlin sees platform types and can't prove nullability. Using !! also throws if the value is null."
      },
      {
        question: "What does @Throws in Kotlin primarily help with for Java callers?",
        options: ["It makes exceptions faster", "It adds checked-exception information to the generated method signature", "It automatically catches exceptions", "It converts exceptions to Result<T>"],
        correctIndex: 1,
        explanation: "@Throws annotates which exceptions can be thrown so Java sees them in the method signature (useful for Java interop and some tooling)."
      },
      {
        question: "What annotation generates overloaded methods for Java callers?",
        options: ["@JvmStatic", "@JvmField", "@JvmOverloads", "@JvmName"],
        correctIndex: 2,
        explanation: "@JvmOverloads generates multiple method versions for Kotlin default parameters, so Java can call them."
      }
    ]
  },
  {
    id: 'activity-lifecycle',
    title: 'Activity & Lifecycle',
    category: 'Android System',
    description: 'The concept of an Activity, its lifecycle, and its role in an app.',
    sections: [
      {
        title: 'What is an Activity?',
        content: '**Activity** = A single screen with a user interface.\n\n**Key Points:**\n- Entry point for user interaction\n- Has its own lifecycle\n- Managed by the Android system\n- Can start other Activities\n\n**Role in App:**\n- Hosts UI components (Views/Composables)\n- Handles user input\n- Coordinates with system (permissions, intents)'
      },
      {
        title: 'Activity Lifecycle (EXAM CRITICAL)',
        content: '**Lifecycle Callbacks:**\n\n1. **onCreate()** - Activity created, initialize UI\n2. **onStart()** - Activity becoming visible\n3. **onResume()** - Activity in foreground, interactive\n4. **onPause()** - Another activity coming to foreground\n5. **onStop()** - Activity no longer visible\n6. **onDestroy()** - Activity being destroyed\n7. **onRestart()** - Returning from stopped state\n\n**Common Flows:**\n- Open app: onCreate → onStart → onResume\n- Press Home: onPause → onStop\n- Return to app: onRestart → onStart → onResume\n- Rotate device: onPause → onStop → onDestroy → onCreate → onStart → onResume'
      },
      {
        title: 'Configuration Changes',
        content: '**Configuration Change** (rotation, language change):\n- Activity is **destroyed and recreated**\n- Full lifecycle: onDestroy → onCreate\n\n**Saving State:**\n- `onSaveInstanceState(Bundle)` - save temporary data\n- `ViewModel` - survives configuration changes\n\n**CRITICAL:** Don\'t store large data(bitmaps) in Bundle - 1MB limit!'
      },
      {
        title: 'Context',
        content: '**Context** = Interface to global application information.\n\n**Types:**\n1. **Application Context** - Singleton, lives with app\n2. **Activity Context** - Tied to Activity lifecycle\n\n**EXAM WARNING:** Never store Activity Context in static/singleton → MEMORY LEAK!\n\n```kotlin\n// WRONG - causes memory leak\nobject Singleton {\n    var context: Context? = null  // Don\'t do this!\n} \n\n// CORRECT\nSingleton.context = applicationContext\n```'
      }
    ],
    quiz: [
      {
        question: "In what order are lifecycle methods called when opening an Activity?",
        options: ["onStart → onCreate → onResume", "onCreate → onStart → onResume", "onResume → onStart → onCreate", "onCreate → onResume → onStart"],
        correctIndex: 1,
        explanation: "Activity startup: onCreate (initialize) → onStart (visible) → onResume (interactive)."
      },
      {
        question: "What happens to an Activity when the device is rotated?",
        options: ["Nothing", "onPause only", "Destroyed and recreated", "onStop only"],
        correctIndex: 2,
        explanation: "Configuration changes cause Activity to be completely destroyed and recreated with new configuration."
      },
      {
        question: "Why can storing Activity Context in a Singleton cause memory leak?",
        options: ["Singletons are slow", "Activity can't be garbage collected when destroyed", "Context is too large", "Singletons don't work on Android"],
        correctIndex: 1,
        explanation: "Singleton outlives Activity. If it holds Activity context, Activity and its views can't be garbage collected."
      },
      {
        question: "Which callback is best for saving small amounts of UI state?",
        options: ["onCreate", "onSaveInstanceState", "onDestroy", "onStop"],
        correctIndex: 1,
        explanation: "onSaveInstanceState is called before potential destruction and lets you save state to a Bundle."
      }
    ]
  },
  {
    id: 'layouts',
    title: 'Layouts in Mobile Applications',
    category: 'Android UI',
    description: 'Basic layout types and their characteristics.',
    sections: [
      {
        title: 'What is a Layout?',
        content: '**Layout** = A container that defines the structure of UI elements.\n\n**Purpose:**\n- Arrange child views\n- Define positioning rules\n- Handle sizing and spacing'
      },
      {
        title: 'LinearLayout',
        content: '**LinearLayout** - Arranges children in a single line.\n\n**Orientation:**\n- `vertical` - top to bottom\n- `horizontal` - left to right\n\n**Weight:** Distribute remaining space proportionally.\n\n```xml\n<LinearLayout android:orientation="horizontal">\n    <Button android:layout_weight="1" />\n    <Button android:layout_weight="2" />  <!-- 2x wider -->\n</LinearLayout>\n```\n\n**Warning:** Nested LinearLayouts with weights cause "double taxation" (exponential measure passes).'
      },
      {
        title: 'ConstraintLayout',
        content: '**ConstraintLayout** - Position based on constraints to other views.\n\n**Advantages:**\n- Flat hierarchy (no nesting needed)\n- Better performance\n- Complex layouts without nesting\n\n**Constraints:** Connect edges (top, bottom, start, end) to parent or other views.\n\n```xml\n<ConstraintLayout>\n    <Button\n        app:layout_constraintTop_toTopOf="parent"\n        app:layout_constraintStart_toStartOf="parent" />\n</ConstraintLayout>\n```'
      },
      {
        title: 'FrameLayout',
        content: '**FrameLayout** - Stack children on top of each other.\n\n**Use Cases:**\n- Fragment containers\n- Overlaying views\n- Single child layouts\n\nChildren are stacked with last added on top.'
      },
      {
        title: 'Layout Comparison (EXAM)',
        content: '| Layout | Use Case | Performance |\n|--------|----------|-------------|\n| LinearLayout | Simple row/column | Good (avoid weights nesting) |\n| ConstraintLayout | Complex layouts | Best (flat hierarchy) |\n| FrameLayout | Stacking/fragments | Good |\n| RelativeLayout | Simple relations | OK (prefer Constraint) |'
      }
    ],
    quiz: [
      {
        question: "What is the main advantage of ConstraintLayout?",
        options: ["Simplest syntax", "Flat hierarchy for better performance", "Automatic animations", "Built-in scrolling"],
        correctIndex: 1,
        explanation: "ConstraintLayout enables complex layouts with flat hierarchy, avoiding expensive nested layouts."
      },
      {
        question: "What is 'double taxation' in LinearLayout?",
        options: ["Paying twice for app store", "Exponential measure passes with nested weights", "Memory tax", "CPU fee"],
        correctIndex: 1,
        explanation: "When LinearLayouts with weights are nested, measure pass becomes exponential, severely hurting performance."
      },
      {
        question: "Which layout is best for stacking views on top of each other?",
        options: ["LinearLayout", "ConstraintLayout", "FrameLayout", "TableLayout"],
        correctIndex: 2,
        explanation: "FrameLayout stacks children on top of each other, last child on top."
      }
    ]
  },
  {
    id: 'compose',
    title: 'Jetpack Compose vs XML',
    category: 'Android UI',
    description: 'How Jetpack Compose differs from the traditional XML-based UI approach.',
    sections: [
      {
        title: 'Traditional XML Approach',
        content: '**XML-based UI:**\n- Layouts defined in XML files\n- Views are objects created at runtime\n- Imperative programming: manually update views\n- findViewById or ViewBinding to access views\n\n```xml\n<TextView android:id="@+id/textView" />\n```\n```kotlin\ntextView.text = "Hello"  // Manually update\n```'
      },
      {
        title: 'Jetpack Compose',
        content: '**Compose** = Modern declarative UI toolkit.\n\n**Key Concepts:**\n- UI written in Kotlin (not XML)\n- **Declarative**: Describe WHAT UI should look like\n- **Reactive**: UI updates automatically when state changes\n- **Composable functions**: Building blocks marked with `@Composable`',
        codeSnippet: {
          language: 'kotlin',
          code: `@Composable
fun Greeting(name: String) {
    // Declarative - describe what to show
    Text(text = "Hello, $name!")
}

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Button(onClick = { count++ }) {
        Text("Count: $count")  // Auto-updates!
    }
}`
        }
      },
      {
        title: 'Key Differences (EXAM CRITICAL)',
        content: '| Aspect | XML | Compose |\n|--------|-----|---------|\n| Language | XML + Kotlin | Pure Kotlin |\n| Paradigm | Imperative | Declarative |\n| Updates | Manual | Automatic (recomposition) |\n| Preview | Limited | Full IDE preview |\n| Views | Objects on heap | Composable functions |\n| State | External management | Built-in (remember, State) |\n| Nesting | ViewGroups | Composable hierarchy |'
      },
      {
        title: 'Recomposition',
        content: '**Recomposition** = Compose re-executing composables when state changes.\n\n**Key Points:**\n- Only affected parts rebuild (smart diffing)\n- `remember { }` - survive recomposition\n- `mutableStateOf()` - triggers recomposition\n\n**Phases:**\n1. Composition - build UI tree\n2. Layout - measure and position\n3. Drawing - render pixels'
      }
    ],
    quiz: [
      {
        question: "What programming paradigm does Jetpack Compose use?",
        options: ["Imperative", "Declarative", "Procedural", "Object-oriented"],
        correctIndex: 1,
        explanation: "Compose is declarative - you describe what UI should look like, not how to update it step by step."
      },
      {
        question: "How does Compose know to update the UI?",
        options: ["Timer", "Manual calls", "Recomposition when state changes", "XML binding"],
        correctIndex: 2,
        explanation: "Compose automatically recomposes (re-executes composables) when observed state changes."
      },
      {
        question: "What does 'remember' do in Compose?",
        options: ["Save to database", "Store value across recompositions", "Log to console", "Cache images"],
        correctIndex: 1,
        explanation: "remember preserves values across recompositions, so state isn't lost when UI rebuilds."
      },
      {
        question: "In Compose, UI elements are defined using what?",
        options: ["XML layouts", "ViewGroup inheritance", "@Composable functions", "JSON configuration"],
        correctIndex: 2,
        explanation: "Compose uses @Composable functions as building blocks - functions that emit UI."
      }
    ]
  },
  {
    id: 'recyclerview',
    title: 'RecyclerView vs ScrollView',
    category: 'Android UI',
    description: 'How RecyclerView works and how it differs from ScrollView.',
    sections: [
      {
        title: 'ScrollView',
        content: '**ScrollView** = Simple scrolling container.\n\n**Characteristics:**\n- Creates ALL child views at once\n- Good for fixed, small content\n- Simple to use\n\n**Problem:** With 1000 items → 1000 views created → memory crash!\n\n```xml\n<ScrollView>\n    <LinearLayout>\n        <!-- All items created immediately -->\n    </LinearLayout>\n</ScrollView>\n```'
      },
      {
        title: 'RecyclerView',
        content: '**RecyclerView** = Efficient list with view recycling.\n\n**Key Mechanism:**\n- Only creates views for **visible items** (~10-15)\n- **Recycles** views that scroll off-screen\n- Reuses recycled views for new data\n\n**Result:** 1000 items but only ~15 views in memory!',
        codeSnippet: {
          language: 'kotlin',
          code: `class MyAdapter(private val items: List<String>) : 
    RecyclerView.Adapter<MyAdapter.ViewHolder>() {
    
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view)
    
    override fun onCreateViewHolder(parent, type): ViewHolder {
        // Called only for visible items (few times)
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item, parent, false)
        return ViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        // Called for each visible item - bind data
        holder.textView.text = items[position]
    }
    
    override fun getItemCount() = items.size
}`
        }
      },
      {
        title: 'ViewHolder Pattern',
        content: '**ViewHolder** - Caches view references.\n\n**Problem it solves:**\n- `findViewById` is expensive (searches view tree)\n- Called every time view becomes visible\n\n**Solution:**\n- Find views once in `onCreateViewHolder`\n- Store references in ViewHolder\n- Reuse for fast binding'
      },
      {
        title: 'Comparison Table (EXAM)',
        content: '| Feature | ScrollView | RecyclerView |\n|---------|------------|--------------|\n| View creation | All at once | Only visible |\n| Memory | High (all items) | Low (recycling) |\n| Performance | Bad for lists | Excellent |\n| Use case | Small fixed content | Large/dynamic lists |\n| Complexity | Simple | Adapter required |'
      }
    ],
    quiz: [
      {
        question: "Why is RecyclerView more memory efficient than ScrollView for lists?",
        options: ["Better compression", "Only creates views for visible items and recycles them", "Uses less memory per view", "Caches to disk"],
        correctIndex: 1,
        explanation: "RecyclerView only maintains views for visible items (~10-15) and recycles them as you scroll."
      },
      {
        question: "What is the purpose of ViewHolder in RecyclerView?",
        options: ["Hold data", "Cache view references to avoid repeated findViewById", "Manage click events", "Store images"],
        correctIndex: 1,
        explanation: "ViewHolder caches view references found once in onCreateViewHolder, avoiding expensive repeated searches."
      },
      {
        question: "When is onCreateViewHolder called?",
        options: ["For every item in the list", "Only when a new view needs to be created (visible items)", "Once at startup", "Never"],
        correctIndex: 1,
        explanation: "onCreateViewHolder is called only when a new view is needed - not for recycled views."
      },
      {
        question: "When is onBindViewHolder called?",
        options: ["Only once", "Every time a view becomes visible with new data", "Never for recycled views", "Only for first 10 items"],
        correctIndex: 1,
        explanation: "onBindViewHolder is called every time data needs to be bound to a view - both new and recycled views."
      }
    ]
  },
  {
    id: 'apis',
    title: 'APIs and API Keys',
    category: 'Connectivity',
    description: 'What APIs and API keys are and why they are required.',
    sections: [
      {
        title: 'What is an API?',
        content: '**API (Application Programming Interface)** = Contract defining how software components communicate.\n\n**In Mobile Context:**\n- Way to access backend services\n- Usually REST or GraphQL over HTTP\n- Returns data (usually JSON)\n\n**Example:**\n```\nGET https://api.weather.com/current?city=Warsaw\nResponse: {"temp": 20, "condition": "sunny"}\n```'
      },
      {
        title: 'What is an API Key?',
        content: '**API Key** = Secret token to authenticate your app with an API.\n\n**Purposes:**\n1. **Authentication** - identify your app\n2. **Rate Limiting** - prevent abuse\n3. **Billing** - track usage for paid APIs\n4. **Access Control** - enable/disable features\n\n**Security:** API keys should be kept secret and not hardcoded in public repos!'
      },
      {
        title: 'Why API Keys are Required',
        content: '**Reasons:**\n1. **Prevent Abuse** - rate limit requests\n2. **Track Usage** - who uses what\n3. **Monetization** - bill based on usage\n4. **Security** - restrict to authorized apps\n\n**Android Best Practices:**\n- Store in `local.properties` (not in git)\n- Use BuildConfig for access\n- Restrict key in Google Cloud Console (package + SHA-1)'
      },
      {
        title: 'Securing API Keys',
        content: '**NEVER:**\n- Hardcode in source code\n- Commit to version control\n- Share publicly\n\n**DO:**\n- Store in environment variables\n- Use `local.properties` for Android\n- Apply restrictions (domain, package name, SHA-1)\n- Use backend proxy for sensitive keys'
      }
    ],
    quiz: [
      {
        question: "What is the main purpose of an API key?",
        options: ["Encrypt data", "Authenticate and identify your app to the API", "Speed up requests", "Compress responses"],
        correctIndex: 1,
        explanation: "API keys authenticate your app, enabling tracking, rate limiting, and access control."
      },
      {
        question: "Where should you store API keys in Android?",
        options: ["Hardcoded in code", "In local.properties (not committed to git)", "In strings.xml", "In the manifest"],
        correctIndex: 1,
        explanation: "local.properties is excluded from git by default and is the recommended place for secrets."
      },
      {
        question: "What restriction should you apply to a Google Maps API key?",
        options: ["IP address", "Package name + SHA-1 certificate", "User password", "No restriction needed"],
        correctIndex: 1,
        explanation: "Android apps should restrict API keys using package name and SHA-1 signing certificate fingerprint."
      }
    ]
  },
  {
    id: 'maps',
    title: 'Google Maps in Mobile Apps',
    category: 'Connectivity',
    description: 'Purpose of Google Maps and using map APIs in Android applications.',
    sections: [
      {
        title: 'Purpose of Google Maps',
        content: '**Uses in Mobile Apps:**\n1. **Location Display** - show user position\n2. **Navigation** - routing, directions\n3. **Points of Interest** - markers, info\n4. **Geofencing** - location-based triggers\n5. **Business Features** - store locators, delivery tracking'
      },
      {
        title: 'Google Maps SDK Setup',
        content: '**Steps:**\n1. Get API key from Google Cloud Console\n2. Add Maps SDK dependency\n3. Add key to manifest\n4. Add MapView/MapFragment\n5. Forward lifecycle events\n\n```xml\n<meta-data\n    android:name="com.google.android.geo.API_KEY"\n    android:value="YOUR_API_KEY"/>\n```'
      },
      {
        title: 'MapView Lifecycle (IMPORTANT)',
        content: '**CRITICAL:** MapView uses OpenGL - must forward lifecycle!\n\n```kotlin\noverride fun onCreate() { mapView.onCreate(savedInstanceState) }\noverride fun onStart() { mapView.onStart() }\noverride fun onResume() { mapView.onResume() }\noverride fun onPause() { mapView.onPause() }\noverride fun onStop() { mapView.onStop() }\noverride fun onDestroy() { mapView.onDestroy() }\n```\n\n**Why?** Map uses GPU resources that must be released properly.'
      },
      {
        title: 'Key Features',
        content: '**Markers:**\n```kotlin\nmap.addMarker(MarkerOptions()\n    .position(LatLng(52.2297, 21.0122))\n    .title("Warsaw"))\n```\n\n**Camera:**\n```kotlin\nmap.moveCamera(CameraUpdateFactory.newLatLngZoom(position, 15f))\n```\n\n**Lite Mode:** Static bitmap for lists (no interaction, low memory)'
      }
    ],
    quiz: [
      {
        question: "Why must you forward lifecycle events to MapView?",
        options: ["Legal requirement", "To properly manage OpenGL/GPU resources", "For animations", "It's optional"],
        correctIndex: 1,
        explanation: "MapView uses OpenGL for rendering. Lifecycle methods ensure GPU resources are properly allocated and released."
      },
      {
        question: "What is Lite Mode in Google Maps?",
        options: ["Dark theme", "Static bitmap image for low-memory scenarios", "Offline mode", "Reduced API calls"],
        correctIndex: 1,
        explanation: "Lite Mode renders map as static bitmap, perfect for lists where interaction isn't needed."
      },
      {
        question: "What coordinate system does Google Maps use?",
        options: ["Cartesian", "WGS 84 (Latitude, Longitude)", "Pixel coordinates", "UTM"],
        correctIndex: 1,
        explanation: "Google Maps SDK uses WGS 84 coordinate system with Latitude and Longitude."
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Local Notifications',
    category: 'Android System',
    description: 'Purpose, creation, and how notifications work in mobile applications.',
    sections: [
      {
        title: 'What are Notifications?',
        content: '**Notification** = Message displayed outside app UI by the system.\n\n**Purposes:**\n1. **Inform users** - new messages, updates\n2. **Engage users** - reminders, calls to action\n3. **Background updates** - download complete, sync done\n\n**Display locations:**\n- Status bar icon\n- Notification shade\n- Lock screen\n- Heads-up (urgent)'
      },
      {
        title: 'Notification Channels (Android 8+)',
        content: '**Channel** = Category of notifications with shared settings.\n\n**Required since Android 8.0!**\n- User can control each channel separately\n- Sound, vibration, importance per channel\n\n```kotlin\nval channel = NotificationChannel(\n    "messages",\n    "Messages",\n    NotificationManager.IMPORTANCE_HIGH\n)\nnotificationManager.createNotificationChannel(channel)\n```\n\n**Importance levels:**\n- HIGH: heads-up, sound\n- DEFAULT: sound\n- LOW: no sound\n- MIN: no sound, no status bar'
      },
      {
        title: 'Creating Notifications',
        content: 'Use NotificationCompat.Builder for compatibility:',
        codeSnippet: {
          language: 'kotlin',
          code: `val notification = NotificationCompat.Builder(context, "channel_id")
    .setContentTitle("New Message")
    .setContentText("You have 1 new message")
    .setSmallIcon(R.drawable.ic_notification)
    .setPriority(NotificationCompat.PRIORITY_HIGH)
    .setContentIntent(pendingIntent)  // Opens app on click
    .build()

notificationManager.notify(notificationId, notification)`
        }
      },
      {
        title: 'PendingIntent',
        content: '**PendingIntent** = Token allowing other apps/system to perform actions as your app.\n\n**Why needed:**\n- Notification runs in system process\n- Needs permission to launch YOUR activity\n\n**Flags (Android 12+):**\n- `FLAG_IMMUTABLE` - intent cannot be modified (secure)\n- `FLAG_MUTABLE` - can be modified (specific use cases)'
      },
      {
        title: 'Permissions (Android 13+)',
        content: '**POST_NOTIFICATIONS permission required!**\n\n```kotlin\nif (Build.VERSION.SDK_INT >= 33) {\n    requestPermissions(arrayOf(\n        Manifest.permission.POST_NOTIFICATIONS\n    ))\n}\n```\n\nWithout permission, notifications won\'t show.'
      }
    ],
    quiz: [
      {
        question: "What is required to post notifications on Android 8+?",
        options: ["Nothing special", "Notification Channel", "Root access", "Internet permission"],
        correctIndex: 1,
        explanation: "Since Android 8.0 (Oreo), notifications must be assigned to a NotificationChannel."
      },
      {
        question: "What does PendingIntent do?",
        options: ["Delays notification", "Allows system to perform actions as your app", "Encrypts content", "Schedules reminders"],
        correctIndex: 1,
        explanation: "PendingIntent is a token granting other apps/system permission to perform operations with your app's identity."
      },
      {
        question: "What new permission is required for notifications on Android 13+?",
        options: ["INTERNET", "POST_NOTIFICATIONS", "VIBRATE", "WAKE_LOCK"],
        correctIndex: 1,
        explanation: "Android 13 requires explicit POST_NOTIFICATIONS runtime permission to show notifications."
      },
      {
        question: "What determines if a notification makes a sound or appears as heads-up?",
        options: ["Notification priority only", "Channel importance level", "App version", "Device settings only"],
        correctIndex: 1,
        explanation: "The Channel's importance level determines behavior - IMPORTANCE_HIGH enables heads-up and sound."
      }
    ]
  },
  {
    id: 'push-notifications',
    title: 'Push Notifications',
    category: 'Android System',
    description: 'Purpose, creation, how push notifications work, and difference from local notifications.',
    sections: [
      {
        title: 'Local vs Push Notifications',
        content: '| Aspect | Local | Push |\n|--------|-------|------|\n| Origin | App itself | Remote server |\n| Internet | Not required | Required |\n| Trigger | App code/alarm | Server message |\n| Use case | Reminders, alarms | Messages, updates |\n| Service | None | FCM, APNs |'
      },
      {
        title: 'Firebase Cloud Messaging (FCM)',
        content: '**FCM** = Google\'s push notification service.\n\n** How it works:**\n1.App registers with FCM → gets token\n2.App sends token to your backend\n3.Backend sends message to FCM with token\n4.FCM delivers to device\n5.App receives in onMessageReceived() \n\n ** Token can change:** On reinstall, data clear, or new device'
      },
      {
        title: 'Message Types',
        content: '**1. Notification Messages:**\n- Displayed automatically by system\n- App in background → system shows it\n- App in foreground → onMessageReceived()\n\n**2. Data Messages:**\n- Always delivered to onMessageReceived()\n- App handles display\n- Full control\n\n**Payload limit: 4KB**'
      },
      {
        title: 'FCM Implementation',
        content: '**1. Extend FirebaseMessagingService:**\n```kotlin\nclass MyFirebaseService : FirebaseMessagingService() {\n    override fun onMessageReceived(message: RemoteMessage) {\n        // Handle message\n        showNotification(message.data)\n    }\n    \n    override fun onNewToken(token: String) {\n        // Send new token to your server\n    }\n}\n```\n\n**2. Register in Manifest:**\n```xml\n<service android:name=".MyFirebaseService"\n    android:exported="false">\n    <intent-filter>\n        <action android:name="com.google.firebase.MESSAGING_EVENT"/>\n    </intent-filter>\n</service>\n```'
      },
      {
        title: 'Doze Mode & High Priority',
        content: '**Doze Mode** - Battery optimization that defers network access.\n\n**Standard messages:** Delayed in Doze\n**High priority messages:** Delivered immediately, wake device\n\n**Use high priority for:** Time-sensitive messages (chat, calls)\n**Use normal priority for:** Non-urgent updates'
      }
    ],
    quiz: [
      {
        question: "What is the main difference between local and push notifications?",
        options: ["Visual appearance", "Local originates from app, push from remote server", "Permission requirements", "Sound capability"],
        correctIndex: 1,
        explanation: "Local notifications are created by the app itself. Push notifications come from a remote server via FCM."
      },
      {
        question: "What is the FCM payload size limit?",
        options: ["1 KB", "4 KB", "1 MB", "Unlimited"],
        correctIndex: 1,
        explanation: "FCM data payload is limited to 4096 bytes (4 KB)."
      },
      {
        question: "What happens to a Notification Message when app is in background?",
        options: ["Dropped", "Displayed automatically by system", "Delivered to onMessageReceived", "Queued until foreground"],
        correctIndex: 1,
        explanation: "Notification messages are automatically displayed by the system when app is in background."
      },
      {
        question: "When might the FCM token change?",
        options: ["Never changes", "Every app launch", "On reinstall, data clear, or new device", "Every hour"],
        correctIndex: 2,
        explanation: "Token changes on reinstall, app data clear, or when restored to a new device. Always handle onNewToken()."
      },
      {
        question: "How are push notifications delivered in Doze mode?",
        options: ["All immediately", "Standard delayed, high priority immediate", "All blocked", "Converted to SMS"],
        correctIndex: 1,
        explanation: "Standard priority messages are batched and delayed. High priority messages bypass Doze for immediate delivery."
      }
    ]
  }
];