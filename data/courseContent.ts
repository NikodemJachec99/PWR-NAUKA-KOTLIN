import { Topic } from '../types';

export const COURSE_TOPICS: Topic[] = [
  {
    id: 'oop-basics',
    title: 'Objects & Classes: Internals',
    category: 'OOP',
    description: 'A deep analysis of JVM memory allocation, ClassLoaders, and the lifecycle of an instance.',
    sections: [
      {
        title: 'The Class: Metaspace & Loading',
        content: 'In the JVM architecture, a **Class** is not merely a blueprint but a metadata entity. When a Kotlin class is referenced, the `ClassLoader` reads the bytecode and stores the class definition (method tables, field descriptions) in the **Metaspace** (Native Memory, distinct from the Heap). \n\n Static initialization blocks (`companion object` init or `static {}` in Java) execute strictly once during this loading phase, locking the class object to ensure thread safety.'
      },
      {
        title: 'The Object: Heap Allocation Mechanics',
        content: 'Instantiation (`val x = Car()`) triggers a complex sequence: \n1. **Allocation**: Memory is reserved in the **Heap** (specifically the Eden Space of the Young Generation). \n2. **Zeroing**: Memory is wiped to default values. \n3. **Header Setup**: The JVM attaches an **Object Header** consisting of the *Mark Word* (hash code, GC age, lock state) and the *Klass Pointer* (pointing to the metadata in Metaspace). \n4. **Initialization**: The constructor `<init>` is executed to initialize state.',
        codeSnippet: {
            language: 'kotlin',
            code: `class Car {
    // Compiled to <init> method
    init { println("Allocation Complete") }
}
// 1. New (Heap Alloc) -> 2. Dup -> 3. InvokeSpecial <init>`
        }
      }
    ],
    quiz: [
        {
            question: "When a new Object is instantiated in Kotlin, where is the reference variable typically stored?",
            options: ["Heap Memory", "Stack Memory", "Metaspace", "Disk"],
            correctIndex: 1,
            explanation: "The object itself lives on the Heap, but the local variable (reference) pointing to it typically lives on the Stack frame of the executing method."
        },
        {
            question: "What happens to the memory of an object when there are no more references to it?",
            options: ["It is immediately deleted", "It creates a memory leak", "It becomes eligible for Garbage Collection", "It moves to the Stack"],
            correctIndex: 2,
            explanation: "The JVM Garbage Collector identifies objects with no active root references and reclaims their memory during the next GC cycle."
        },
        {
            question: "Why do non-static Inner Classes in Java/Kotlin cause potential memory leaks in Activities?",
            options: ["They are too large", "They hold an implicit strong reference to the outer class instance", "They are created in the Metaspace", "They cannot be serialized"],
            correctIndex: 1,
            explanation: "An inner class implicitly stores a reference to its outer class (this$0). If the inner class object (e.g., a Handler) outlives the Activity, it prevents the Activity from being garbage collected."
        },
        {
            question: "What is the purpose of the Object Header's 'Mark Word'?",
            options: ["To store the class name", "To store the variable values", "To store hash code, GC age, and lock information", "To point to the super class"],
            correctIndex: 2,
            explanation: "The Mark Word is a machine-word sized header used by the JVM to manage synchronization (locks), Garbage Collection generation tracking, and identity hash codes."
        }
    ]
  },
  {
    id: 'class-types',
    title: 'Class Taxonomy & Architecture',
    category: 'OOP',
    description: 'Architectural distinction between State and Behavior inheritance.',
    sections: [
      {
        title: 'Abstract Classes: "IS-A" Relationships',
        content: 'An **Abstract Class** is a partial implementation designed for inheritance. Crucially, it can hold **State** (backing fields with allocated memory). This creates a strong coupling between parent and child, as the child inherits the parent\'s memory layout. Constructors in abstract classes are invoked via `invokespecial` by subclasses to initialize this shared state.'
      },
      {
        title: 'Interfaces: "CAN-DO" Contracts',
        content: 'An **Interface** represents a pure behavioral contract. In Kotlin/Java 8+, interfaces can contain default implementations. Under the hood, these are compiled as **Static Methods** in a companion class or default method tables. \n\nCritically, interfaces **cannot hold state**. They cannot have instance fields because allowing them would introduce the "Diamond Problem" of multiple inheritance memory layout. Any property in an interface is either stateless (computed) or abstract.'
      }
    ],
    quiz: [
        {
            question: "Why can't an Interface in Kotlin hold state (backing fields)?",
            options: ["Because it is final by default", "Because multiple inheritance of state is forbidden to avoid the Diamond Problem", "Because it is compiled to a Java Annotation", "It actually can hold state"],
            correctIndex: 1,
            explanation: "Allowing interfaces to hold state would complicate the object memory layout when multiple interfaces are implemented. Kotlin enforces stateless interfaces to ensure clean multiple inheritance of behavior only."
        },
        {
            question: "If you need to share code AND state between related classes, which should you use?",
            options: ["Interface", "Abstract Class", "Sealed Class", "Annotation"],
            correctIndex: 1,
            explanation: "Abstract Classes are designed specifically for sharing both behavior and state (fields) among a hierarchy of related classes."
        },
        {
            question: "How does a 'companion object' differ from a Java 'static' member internally?",
            options: ["It is the same thing", "It is an actual Singleton object instance allocated on the Heap", "It is a compile-time constant", "It is stored on the Stack"],
            correctIndex: 1,
            explanation: "A companion object is a real object (Singleton pattern) instantiated at runtime. Java statics are not objects; they are fields/methods belonging to the class structure itself."
        },
        {
            question: "What is a SAM (Single Abstract Method) conversion?",
            options: ["Converting a String to a Map", "A compiler feature allowing lambdas to implement interfaces with one abstract method", "A memory optimization technique", "A way to convert classes to interfaces"],
            correctIndex: 1,
            explanation: "Kotlin (and Java 8+) allows you to pass a lambda where an interface with a single abstract method (like OnClickListener) is expected, reducing boilerplate."
        }
    ]
  },
  {
    id: 'inheritance',
    title: 'Inheritance & Dispatch',
    category: 'OOP',
    description: 'Virtual Method Tables (vtable), the Open Principle, and initialization safety.',
    sections: [
      {
        title: 'The "Final by Default" Philosophy',
        content: 'Kotlin classes are `final` by default (Effective Java, Item 19: "Design and document for inheritance or else prohibit it"). \n\nInheritance breaks encapsulation; if a parent class changes its internal implementation, it can break subclasses that depend on side effects. The `open` keyword forces the developer to explicitly opt-in to this architectural contract.',
        codeSnippet: {
          language: 'kotlin',
          code: `open class Base {
    // Compiled to a virtual method call
    open fun dispatch() { }
}
// Subclasses populate the vtable (Virtual Method Table)
class Child : Base() { override fun dispatch() {} }`
        }
      },
      {
        title: 'Dynamic Dispatch (vtable)',
        content: 'Runtime Polymorphism relies on the **vtable (Virtual Method Table)**. Each class has a table pointing to the actual machine code for its methods. \n\nWhen you call `object.method()`, the JVM does not know at compile time which method to call. Instead, it performs a lookup in the vtable of the runtime object (`invokevirtual` instruction) to find the correct implementation. This incurs a slight CPU branch prediction cost compared to static calls.'
      }
    ],
    quiz: [
        {
            question: "In Kotlin, what is the default visibility of a class?",
            options: ["private", "protected", "public", "internal"],
            correctIndex: 2,
            explanation: "The default visibility is 'public'. However, the default *inheritance* modifier is 'final'."
        },
        {
            question: "If a Parent class constructor initializes a property that is overridden in a Child class, what happens?",
            options: ["The Child's value is used immediately", "The Parent uses the uninitialized Child property (null/zero)", "Compilation Error", "Runtime Exception"],
            correctIndex: 1,
            explanation: "The Parent constructor runs BEFORE the Child constructor. If the Parent calls an overridden method or accesses an open property, it accesses the Child's version which has not yet been initialized, leading to null/zero bugs."
        },
        {
            question: "What is the 'Diamond Problem' in Interface Default Methods?",
            options: ["A graphics rendering issue", "When two interfaces define the same default method and a class implements both", "A memory leak in diamonds", "A security encryption flaw"],
            correctIndex: 1,
            explanation: "If a class implements two interfaces that both provide a default implementation for method `foo()`, the compiler forces the class to override `foo()` and explicitly choose which interface's version to call."
        },
        {
            question: "Why does marking a class 'final' potentially improve performance?",
            options: ["It saves memory", "It allows the JIT compiler to inline methods (devirtualization)", "It reduces disk space", "It prevents garbage collection"],
            correctIndex: 1,
            explanation: "If a class is final, the compiler knows there are no subclasses. It can replace expensive virtual method lookups (vtable) with direct static calls or inlining."
        }
    ]
  },
  {
    id: 'data-enum',
    title: 'Data vs Enum: Bytecode Analysis',
    category: 'Kotlin',
    description: 'Component generation, copy mechanics, and memory footprints.',
    sections: [
      {
        title: 'Data Classes: Code Generation',
        content: 'Data classes are a compiler feature. For every property in the primary constructor, the compiler automatically synthesizes: \n1. `equals()`/`hashCode()`: Optimised for value comparison. \n2. `toString()`: String representation. \n3. `componentN()` functions: Enabling destructuring declarations (`val (name, age) = user`). \n4. `copy()`: A method allowing shallow copies with property modification.',
      },
      {
        title: 'Enum Classes: Memory & Structure',
        content: 'Each entry in an Enum is a **static final instance** (Singleton) of the Enum class. \n\n**Performance Warning**: Enums in Android (historically) consumed significantly more memory and DEX size than integer constants (`public static final int`). However, with modern R8 shrinking and ART (Android Runtime) optimizations, this overhead is negligible for most apps compared to the type-safety benefits they provide.'
      }
    ],
    quiz: [
        {
            question: "What is the primary architectural difference between Sealed Classes and Enum Classes?",
            options: ["Sealed classes are for constants, Enums for types", "Enums can have subclasses, Sealed classes cannot", "Enum constants exist as singletons; Sealed class subclasses can have multiple instances with state", "There is no difference"],
            correctIndex: 2,
            explanation: "Enum constants are static singletons. Sealed class subclasses can be instantiated multiple times, each with its own unique state context."
        },
        {
            question: "Why does the 'copy()' method of a data class only do a shallow copy?",
            options: ["To save memory", "Because deep copy is impossible", "Because it copies references, not the objects inside", "It actually does a deep copy"],
            correctIndex: 2,
            explanation: "The generated copy method copies the reference values. If a property is a mutable list, both the original and the copy will point to the same list object."
        },
        {
            question: "What advantage does @IntDef provide over Enum classes?",
            options: ["Better type safety", "Zero object allocation overhead (uses primitive ints)", "More features", "JSON serialization support"],
            correctIndex: 1,
            explanation: "@IntDef is a build-time annotation that validates integer constants. At runtime, they are just primitives on the stack, avoiding the heap allocation and object headers required for Enums."
        },
        {
            question: "Is 'when' exhaustive for Data Classes?",
            options: ["Yes, always", "No, unless using Sealed Classes", "Only if the data class is private", "Only in debug mode"],
            correctIndex: 1,
            explanation: "Data classes are final and open-ended in terms of instantiation. The compiler cannot guarantee it knows all possible instances. 'when' is only exhaustive for Enums and Sealed Classes."
        }
    ]
  },
  {
    id: 'async',
    title: 'Async: Threads vs Coroutines',
    category: 'Kotlin',
    description: 'Kernel-level Context Switching vs. User-space State Machines.',
    sections: [
      {
        title: 'The Cost of Threads',
        content: 'Threads are managed by the OS Kernel. Switching between threads involves a **Context Switch**: \n1. Saving CPU registers. \n2. Flushing the TLB (Translation Lookaside Buffer). \n3. Polluting L1/L2 CPU Caches. \n\nThis operation is expensive (microseconds). Creating thousands of threads results in `OutOfMemoryError` as each thread consumes ~1MB of stack space.'
      },
      {
        title: 'Coroutines: Continuation Passing Style (CPS)',
        content: 'Coroutines are "stackless" and managed in user-space. The Kotlin compiler transforms `suspend` functions into a **State Machine**. \n\nWhen a coroutine suspends, its local variables and instruction pointer are saved into a heap object called a **Continuation**. The underlying thread is released immediately to do other work. When the result is ready, the Continuation is rescheduled, restoring the state. This allows 1 thread to handle thousands of concurrent coroutines.',
        codeSnippet: {
            language: 'kotlin',
            code: `// Compiler Transformation
fun fetch(completion: Continuation<Data>) {
   val state = completion.state
   if (state == 0) {
       // Start async work, return INTROSPECTION
   }
   if (state == 1) {
       // Restore variables and resume
   }
}`
        }
      }
    ],
    quiz: [
        {
            question: "What mechanism allows Coroutines to 'suspend' without blocking a thread?",
            options: ["Thread.sleep()", "Spinlocks", "Continuation Passing Style (CPS) and State Machines", "Java Virtual Machine Magic"],
            correctIndex: 2,
            explanation: "The compiler transforms suspend functions into a state machine. When suspended, the current state (local vars) is saved in a Continuation object, and the thread is free to run other tasks."
        },
        {
            question: "Which Dispatcher is best suited for heavy CPU calculations (e.g., Image Processing)?",
            options: ["Dispatchers.Main", "Dispatchers.IO", "Dispatchers.Default", "Dispatchers.Unconfined"],
            correctIndex: 2,
            explanation: "Dispatchers.Default is backed by a thread pool sized to the number of CPU cores, making it ideal for CPU-intensive tasks. Dispatchers.IO is for blocking I/O (network/disk)."
        },
        {
            question: "What is the primary difference between a 'Job' and a 'SupervisorJob'?",
            options: ["SupervisorJob is faster", "SupervisorJob does not cancel its children if one child fails", "SupervisorJob runs on the main thread", "Job cannot have children"],
            correctIndex: 1,
            explanation: "In a standard Job/Scope, a child failure cancels the parent and all other children. A SupervisorJob allows children to fail independently without propagating the cancellation."
        },
        {
            question: "What happens if you throw an exception in a `launch` block vs an `async` block?",
            options: ["Both crash immediately", "Launch throws immediately; Async encapsulates it in the Deferred result", "Async ignores errors", "Launch returns null"],
            correctIndex: 1,
            explanation: "`launch` treats exceptions as uncaught immediately (crashing if not handled by a generic handler). `async` captures the exception and only re-throws it when `.await()` is called."
        }
    ]
  },
  {
    id: 'kotlin-java',
    title: 'Kotlin vs Java: Interop & Safety',
    category: 'Kotlin',
    description: 'Runtime null checks, Platform Types, and Functional features.',
    sections: [
      {
        title: 'Null Safety: Compile Time vs Runtime',
        content: 'Kotlin provides compile-time null safety (`String` vs `String?`). However, to ensure integrity when interacting with Java, the Kotlin compiler injects **Intrinsic Checks** (`Intrinsics.checkNotNull`). \n\nIf Java code returns `null` into a Kotlin non-null type, these intrinsics trigger an `IllegalStateException` immediately at the boundary, rather than propagating a null deeper into the system.'
      },
      {
        title: 'Platform Types (Type!)',
        content: 'When Kotlin consumes Java code without `@Nullable` or `@NonNull` annotations, the type is treated as a **Platform Type** (`String!`). The compiler relaxes null-checks for these types. This is a pragmatic design decision to allow interoperability, but it shifts the responsibility of null-checking to the developer.'
      }
    ],
    quiz: [
        {
            question: "Are Kotlin Extension functions polymorphic (dynamic dispatch)?",
            options: ["Yes, always", "No, they are resolved statically based on the declared type", "Only if marked 'open'", "Only in data classes"],
            correctIndex: 1,
            explanation: "Since they are static methods under the hood, the extension function chosen depends on the type of the variable at compile time, not the runtime type of the object."
        },
        {
            question: "What is the 'Platform Type' (Type!) in Kotlin?",
            options: ["A type specific to Android", "A type coming from Java with unknown nullability", "A primitive type", "A generic type"],
            correctIndex: 1,
            explanation: "When Kotlin consumes Java code that lacks @Nullable/@NonNull annotations, it treats the type as a Platform Type (String!), disabling strict null checks but risking NPEs."
        },
        {
            question: "What does the `@JvmField` annotation do?",
            options: ["Forces the field to be private", "Exposes the field as a public Java field, removing getters/setters", "Makes the field volatile", "Prevents garbage collection"],
            correctIndex: 1,
            explanation: "It instructs the compiler not to generate getters/setters for this property and instead expose it as a public field in the generated Java bytecode."
        },
        {
            question: "What problem does `@JvmOverloads` solve?",
            options: ["Memory overloading", "It generates multiple overloaded Java methods for Kotlin functions with default arguments", "It speeds up compilation", "It allows method overriding"],
            correctIndex: 1,
            explanation: "Java does not support default parameter values. @JvmOverloads generates multiple versions of the method (with varying argument counts) so Java callers don't have to provide all arguments."
        }
    ]
  },
  {
    id: 'components-lifecycle',
    title: 'Activity Internals & Lifecycle',
    category: 'Android System',
    description: 'Process death, Binder limits, and WindowManager interaction.',
    sections: [
      {
        title: 'Process Death & State Restoration',
        content: 'The Android OS may kill your app process at any time when it is in the background to reclaim memory. This is **Process Death**. \n\nThe Activity state must be saved in the `onSaveInstanceState` bundle. This Bundle is sent across processes via the **Binder Transaction** mechanism to the System Server. Because Binder has a hard limit (~1MB for the entire transaction), you must only store small primitives (IDs, flags), not large bitmaps or lists.'
      },
      {
        title: 'Context vs Application Context',
        content: '`Context` is an interface to global information. \n1. **Application Context**: Singleton, tied to the process lifecycle. Use for Singletons/DB. \n2. **Activity Context**: Tied to the screen. Contains references to the UI hierarchy (Views) and Theme. \n\n**Fatal Error**: Passing an Activity Context to a Singleton creates a massive Memory Leak. The Singleton outlives the Activity, preventing the Activity and its entire View tree from being Garbage Collected.'
      }
    ],
    quiz: [
        {
            question: "What causes an Activity to leak memory if referenced statically?",
            options: ["The Garbage Collector ignores static variables", "The Activity holds a reference to the Window", "The Activity holds a strong reference to the View hierarchy and Resources", "Static variables are stored on the Stack"],
            correctIndex: 2,
            explanation: "An Activity Context holds references to the entire View hierarchy. If a static object holds the Activity, the entire UI tree cannot be garbage collected even after the Activity is destroyed."
        },
        {
            question: "During a configuration change (e.g., rotation), what happens to the Activity?",
            options: ["It is paused and resumed", "It is resized dynamically", "It is destroyed and recreated", "It enters Picture-in-Picture mode"],
            correctIndex: 2,
            explanation: "By default, the system destroys the existing Activity instance (calling onDestroy) and creates a completely new instance (onCreate) with the new configuration resources."
        },
        {
            question: "What happens if you launch an Activity with `launchMode='singleTop'` that is already at the top of the stack?",
            options: ["A new instance is created on top", "The app crashes", "The existing instance is reused and `onNewIntent` is called", "The activity is destroyed and recreated"],
            correctIndex: 2,
            explanation: "singleTop prevents duplicate instances on the top of the stack. Instead of creating a new one, the system delivers the Intent to the existing instance via onNewIntent()."
        },
        {
            question: "Why is the Binder Transaction limit (~1MB) critical for `onSaveInstanceState`?",
            options: ["It limits the size of the APK", "If the Bundle exceeds this limit, the app crashes with `TransactionTooLargeException`", "It limits the database size", "It limits network requests"],
            correctIndex: 1,
            explanation: "The system process buffer is shared across all transactions. Attempting to pass large data (like Bitmaps) through the Binder in a Bundle causes a crash."
        }
    ]
  },
  {
    id: 'notifications',
    title: 'Notification System Architecture',
    category: 'Android System',
    description: 'PendingIntents, Channels, and Foreground Services.',
    sections: [
      {
        title: 'PendingIntent: Security Tokens',
        content: 'A `PendingIntent` is a security token given to another application (like the System Notification Service) allowing it to execute an Intent with **your application\'s identity and permissions**. \n\nIt wraps a standard Intent. Because the Notification Shade runs in a system process, it needs this token to launch your Activity. Using `FLAG_IMMUTABLE` (Android 12+) is crucial to prevent "Intent Hijacking" vulnerabilities.'
      },
      {
        title: 'Foreground Services',
        content: 'To perform long-running operations (Music playback, Navigation) without being killed, an app must start a **Foreground Service** and display a persistent Notification. This signals to the OS that the user is actively aware of the app, preventing the Low Memory Killer (LMK) from terminating the process.'
      }
    ],
    quiz: [
        {
            question: "What determines if a notification makes a sound or heads-up display?",
            options: ["The Notification Priority", "The Importance level of the Notification Channel", "The text content", "The icon color"],
            correctIndex: 1,
            explanation: "Since Android 8.0, the Channel's importance (IMPORTANCE_HIGH, DEFAULT, LOW) dictates the intrusion level. Individual notification priority is largely ignored."
        },
        {
            question: "Why do we use PendingIntent for notifications?",
            options: ["Because Intent is too slow", "To grant the System permission to execute an Intent as if it were our app", "To delay the execution", "To encrypt the data"],
            correctIndex: 1,
            explanation: "The Notification Shade runs in a separate system process. A PendingIntent wraps your Intent and grants that process the right to launch your Activity using your app's identity."
        },
        {
            question: "What is a 'Notification Group' used for?",
            options: ["To delete notifications", "To bundle multiple notifications from the same app into a single summary", "To share notifications between apps", "To encrypt notifications"],
            correctIndex: 1,
            explanation: "Grouping allows the system to collapse multiple notifications (e.g., 5 messages) into a single entry to avoid cluttering the shade."
        },
        {
            question: "Starting from Android 13 (API 33), what is required to post notifications?",
            options: ["Internet permission", "POST_NOTIFICATIONS runtime permission", "Root access", "Google Play Services"],
            correctIndex: 1,
            explanation: "Notifications are no longer granted by default. The app must explicitly request the runtime permission from the user."
        }
    ]
  },
  {
    id: 'push-notifications',
    title: 'FCM & Push Mechanics',
    category: 'Android System',
    description: 'Socket connections, Heartbeats, and Doze Mode.',
    sections: [
      {
        title: 'FCM Persistent Connection',
        content: 'Firebase Cloud Messaging (FCM) relies on Google Play Services maintaining a single, shared, persistent TCP socket connection to Google\'s servers. This is kept alive via **Heartbeats**. \n\nWhen a push arrives, Play Services receives it and broadcasts an Intent to your specific application. This is why FCM is battery efficient; one connection serves all apps.'
      },
      {
        title: 'Doze Mode & High Priority',
        content: 'When a device is stationary and screen-off, it enters **Doze Mode**, deferring network and CPU activity. Standard push messages are batched and delayed. \n\n**High Priority** messages (Data messages) are allowed to temporarily wake the device and grant a short "maintenance window" to the app to process the message, but this quota is strictly rate-limited by the OS.'
      }
    ],
    quiz: [
        {
            question: "How are High Priority FCM messages handled in Doze Mode?",
            options: ["They are blocked until the user wakes the device", "They are delivered immediately, granting a temporary maintenance window", "They are converted to SMS", "They are dropped"],
            correctIndex: 1,
            explanation: "High Priority FCM messages allow the app to wake up from Doze mode for a short period to process the message and show a notification."
        },
        {
            question: "If your app is in the Background, where does a 'Notification Message' (payload with 'notification' key) go?",
            options: ["To onMessageReceived()", "To the System Tray (Notification Shade) automatically", "To the Activity", "It is ignored"],
            correctIndex: 1,
            explanation: "The SDK automatically posts it to the System Tray. onMessageReceived is NOT called unless it is a 'Data Message' or the app is in the Foreground."
        },
        {
            question: "What is the payload size limit for an FCM Data Message?",
            options: ["10 MB", "4 KB", "1 MB", "64 KB"],
            correctIndex: 1,
            explanation: "FCM is designed for lightweight signals. The hard limit for the data payload is 4096 bytes (4KB)."
        },
        {
            question: "When might the FCM Token change?",
            options: ["Every time the app starts", "When the app is restored on a new device, uninstalled/reinstalled, or app data is cleared", "Every hour", "Ideally never"],
            correctIndex: 1,
            explanation: "The token is stable but not permanent. Restoring a backup to a new device or clearing app data invalidates the old token."
        }
    ]
  },
  {
    id: 'layouts',
    title: 'Advanced Layout Rendering',
    category: 'Android UI',
    description: 'Measure/Layout/Draw passes, Choreographer, and Double Taxation.',
    sections: [
      {
        title: 'The Rendering Pipeline: 16ms',
        content: 'To achieve 60 FPS, the main thread has 16ms to update the screen. The **Choreographer** signals the start of a frame (VSYNC). The ViewRootImpl performs three traversals: \n1. **Measure**: Each view determines its desired size (Top-down traversal). \n2. **Layout**: Parent positions children (Top-down). \n3. **Draw**: Recording drawing commands to the DisplayList (GPU). \n\nPerformance hits usually occur in Measure/Layout.'
      },
      {
        title: 'ConstraintLayout: Cassowary Algorithm',
        content: 'Nested layouts (e.g., `LinearLayout` inside `LinearLayout`) cause "Double Taxation" (exponential measure passes). `ConstraintLayout` solves this by using the **Cassowary linear arithmetic constraint solving algorithm**. It flattens the view hierarchy, allowing complex layouts to be resolved in a single, efficient pass.'
      }
    ],
    quiz: [
        {
            question: "Why is 'Double Taxation' a problem in nested LinearLayouts with weights?",
            options: ["It requires two Draw passes", "It triggers the Measure pass twice for each child", "It consumes double the memory", "It blocks the Main Thread"],
            correctIndex: 1,
            explanation: "When using layout_weight, the LinearLayout must measure the child twice: once to check preferred size, and again to distribute remaining space. Nesting these causes exponential measurement costs."
        },
        {
            question: "Which method is the entry point for a custom View to determine its own size?",
            options: ["onLayout", "onDraw", "onMeasure", "invalidate"],
            correctIndex: 2,
            explanation: "onMeasure(widthMeasureSpec, heightMeasureSpec) is where a View calculates how large it wants to be based on constraints from its parent."
        },
        {
            question: "What is the purpose of the `<merge>` tag in XML layouts?",
            options: ["To merge images", "To eliminate a redundant parent ViewGroup when including layouts", "To run code in parallel", "To join strings"],
            correctIndex: 1,
            explanation: "When including a layout, <merge> acts as a pseudo-root. It attaches its children directly to the parent of the <include>, removing one level of nesting."
        },
        {
            question: "What does `ViewStub` do?",
            options: ["It is a placeholder that inflates its layout only when explicitly told to", "It is an empty view", "It is a debugging tool", "It caches views"],
            correctIndex: 1,
            explanation: "ViewStub is a zero-sized, lazy-inflation view. It stays cheap in memory until you call `.inflate()` or `.setVisible(VISIBLE)`, loading the heavy resources only when needed."
        }
    ]
  },
  {
    id: 'compose',
    title: 'Jetpack Compose Internals',
    category: 'Android UI',
    description: 'Compiler plugin, Slot Table, and Positional Memoization.',
    sections: [
      {
        title: 'Compiler Plugin & The Gap Buffer',
        content: 'Jetpack Compose is not just a library; it relies on a custom Kotlin Compiler Plugin. It rewrites `@Composable` functions to accept a `$Composer` parameter. \n\nThe runtime stores the UI tree not as objects, but as a linear array of data called the **Slot Table** (Gap Buffer). This structure is cache-friendly and allows O(1) insertion/deletion, making dynamic UI updates extremely fast.'
      },
      {
        title: 'Positional Memoization',
        content: 'Compose uses **Positional Memoization**. It identifies a composable based on its **execution order** in the call stack. \n\n`remember { }` works by storing a value in the Slot Table at the current execution position. During recomposition, if the position is reached again and inputs haven\'t changed, the runtime retrieves the stored value instead of recalculating it.'
      }
    ],
    quiz: [
        {
            question: "What is 'Positional Memoization' in Compose?",
            options: ["Caching images based on coordinates", "The runtime remembering the structure of the UI tree based on execution order", "Saving scroll position", "Remembering variable values across threads"],
            correctIndex: 1,
            explanation: "Compose identifies nodes in the UI tree based on their position in the code execution. This is why you cannot call Composables from loops/conditions without understanding the implications."
        },
        {
            question: "What does the 'remember' keyword do?",
            options: ["Saves data to disk", "Stores a value in the Composition memory, surviving recomposition", "Prevents a function from running", "Logs a variable"],
            correctIndex: 1,
            explanation: "'remember' calculates a value once and stores it. During recomposition, if the key hasn't changed, it returns the stored value instead of recalculating it."
        },
        {
            question: "When should you use `derivedStateOf`?",
            options: ["Always", "When a state changes frequently (like scroll offset) but the UI only needs to update on thresholds", "To fetch network data", "To replace `remember`"],
            correctIndex: 1,
            explanation: "It creates a derived state that only triggers recomposition when the *result* of the calculation changes, filtering out the noise of high-frequency input updates."
        },
        {
            question: "What is the difference between `SideEffect` and `LaunchedEffect`?",
            options: ["No difference", "SideEffect runs on every successful recomposition; LaunchedEffect runs suspend functions in a scope tied to the key", "SideEffect is for background threads", "LaunchedEffect is deprecated"],
            correctIndex: 1,
            explanation: "SideEffect is used for publishing state to external non-Compose systems after every render. LaunchedEffect is for running async coroutines when the composable enters the composition or keys change."
        }
    ]
  },
  {
    id: 'recycler-scroll',
    title: 'RecyclerView vs ScrollView',
    category: 'Android UI',
    description: 'ViewHolder pattern, ViewPools, and Scrap Heaps.',
    sections: [
      {
        title: 'RecyclerView Internals',
        content: 'RecyclerView orchestrates a complex dance to reuse views. \n1. **Scrap Heap**: Views that are temporarily detached during layout but will reappear immediately (e.g., during a localized animation). \n2. **RecycledViewPool**: Views that have scrolled completely off-screen. The data is wiped (unbind), and the view is put in the pool. \n\nWhen a new item appears, RecyclerView checks the Scrap Heap first, then the Pool. Only if both are empty does it call `onCreateViewHolder`. This minimizes the expensive `LayoutInflater.inflate` and `findViewById` calls.'
      }
    ],
    quiz: [
        {
            question: "What is the specific role of the 'ViewHolder' pattern?",
            options: ["To hold the data model", "To cache references to View objects (findViewById) to avoid lookups", "To handle click events", "To manage the database connection"],
            correctIndex: 1,
            explanation: "findViewById is an expensive recursive search. The ViewHolder finds these views once upon creation and caches the references for fast binding later."
        },
        {
            question: "When does 'onCreateViewHolder' get called?",
            options: ["For every item in the list", "Only when the user scrolls", "Only when there are no scrap views available in the pool to reuse", "When the activity starts"],
            correctIndex: 2,
            explanation: "It is only called when the RecyclerView needs a NEW view instance. If a view can be recycled from the pool, only onBindViewHolder is called."
        },
        {
            question: "What does `setHasFixedSize(true)` enable?",
            options: ["It prevents items from changing size", "It optimizes performance by allowing RecyclerView to skip calculating its own size during layout", "It fixes the number of items", "It disables scrolling"],
            correctIndex: 1,
            explanation: "It tells the system that the size of the RecyclerView container itself (width/height) does not depend on the adapter contents, avoiding a full layout pass when items change."
        },
        {
            question: "Where does `DiffUtil` calculate the difference between lists?",
            options: ["On the Main Thread", "Ideally on a background thread to avoid blocking UI", "In the GPU", "On the Server"],
            correctIndex: 1,
            explanation: "DiffUtil algorithms (Eugene Myers') can be O(N^2) in worst cases. It should be run on a background thread (e.g., via ListAdapter or AsyncListDiffer) to prevent frame drops."
        }
    ]
  },
  {
    id: 'apis',
    title: 'Network Security & Cert Pinning',
    category: 'Connectivity',
    description: 'Protecting API traffic, keys, and Man-in-the-Middle attacks.',
    sections: [
      {
        title: 'Certificate Pinning',
        content: 'Standard HTTPS relies on the device\'s Trust Store (Root CAs). A compromised device (or user-installed root cert) can intercept traffic (Man-in-the-Middle). \n\n**Certificate Pinning** hardcodes the hash of the backend server\'s public key (Subject Public Key Info - SPKI) into the app. The app verifies that the server presented strictly THAT specific certificate, rejecting all others even if signed by a valid CA.'
      },
      {
        title: 'API Key Restrictions',
        content: 'In production, API Keys (e.g., Google Maps) are public in the APK byte code. To secure them, you must apply **Restrictions** in the Google Cloud Console: \n1. **Application Restriction**: Restrict usage to your specific Package Name + SHA-1 Signing Certificate Fingerprint. \n2. **API Restriction**: Limit the key to only call specific APIs (e.g., Maps SDK only, not Places API).'
      }
    ],
    quiz: [
        {
            question: "What is the most secure way to restrict a Google Maps API Key for an Android App?",
            options: ["IP Address restriction", "Referrer restriction", "Application Restriction using Package Name and SHA-1 Certificate Fingerprint", "No restriction needed"],
            correctIndex: 2,
            explanation: "This ensures that only requests originating from your specific app (verified by the OS signature) are accepted by Google's servers."
        },
        {
            question: "Where should sensitive API keys be stored during development?",
            options: ["strings.xml", "Manifest.xml", "local.properties (not in version control)", "Constant.java class"],
            correctIndex: 2,
            explanation: "local.properties is excluded from Git by default. The build.gradle file can read from it and inject the key into the generated BuildConfig class."
        },
        {
            question: "What is the primary function of R8 (ProGuard)?",
            options: ["It encrypts the source code", "It shrinks (removes unused code), obfuscates (renames), and optimizes bytecode", "It compiles Kotlin to C++", "It signs the APK"],
            correctIndex: 1,
            explanation: "R8 walks the code graph starting from entry points (Activities) and removes unreachable code, while renaming classes/fields to short 'a.b.c' names to reduce size and reverse-engineering ability."
        },
        {
            question: "Why is 'Cleartext Traffic' (HTTP) disabled by default since Android 9?",
            options: ["To save bandwidth", "To enforce privacy and integrity via TLS (HTTPS) and prevent passive eavesdropping", "Because HTTP is too slow", "Google owns SSL"],
            correctIndex: 1,
            explanation: "Unencrypted HTTP traffic can be intercepted or injected with malicious content. Android enforces HTTPS to protect user data."
        }
    ]
  },
  {
    id: 'maps',
    title: 'Maps: Tiles & OpenGL ES',
    category: 'Connectivity',
    description: 'Vector rendering, Tile caching, and Lifecycle forwarding.',
    sections: [
      {
        title: 'Vector Map Rendering (OpenGL ES)',
        content: 'Modern Google Maps uses **Vector Tiles**. Instead of downloading pre-rendered images (Raster), the server sends vector data (lines, polygons, labels). The device\'s GPU renders this data using **OpenGL ES**. \n\nThis allows smooth zooming, rotation, and tilting with infinite resolution, but consumes significant Battery and GPU resources. The `MapView` must be strictly managed to pause rendering when off-screen.'
      }
    ],
    quiz: [
        {
            question: "Why must you forward lifecycle methods to MapView?",
            options: ["To update the GPS location", "To manage the OpenGL ES context and release resources properly", "To download map data", "To show the blue dot"],
            correctIndex: 1,
            explanation: "Maps use heavy graphics resources. If onPause/onDestroy are not forwarded, the map continues to render in the background, draining battery and leaking memory."
        },
        {
            question: "What coordinate system does the Google Maps SDK use?",
            options: ["Cartesian (X, Y)", "WGS 84 (Latitude, Longitude)", "Polar Coordinates", "Mercator Projection"],
            correctIndex: 1,
            explanation: "The input API uses WGS 84 (Lat/Lng). Internally, the map renders using a Web Mercator projection."
        },
        {
            question: "What is 'Lite Mode' in Google Maps?",
            options: ["A dark mode", "A bitmap-based, non-interactive rendering for static lists", "A paid version", "A 2D only mode"],
            correctIndex: 1,
            explanation: "Lite Mode renders the map as a static image (Bitmap) rather than an interactive OpenGL stream. It is extremely lightweight and suitable for ListViews or simple thumbnails."
        },
        {
            question: "How does Marker Clustering improve performance?",
            options: ["It deletes markers", "It groups nearby markers into a single icon to reduce draw calls and visual clutter", "It increases marker size", "It uses raster images"],
            correctIndex: 1,
            explanation: "Rendering thousands of individual markers creates massive overdraw and GPU strain. Clustering aggregates them based on zoom level."
        }
    ]
  }
];
