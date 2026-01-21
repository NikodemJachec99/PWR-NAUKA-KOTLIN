import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ExamMode = 'theory' | 'quiz';

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    topic: string;
}

// THEORY CONTENT - Condensed exam preparation material
const EXAM_THEORY = `
# 📚 Minimum Theory for Exam

---

## 1. Objects and Classes

**Class** = Blueprint/template defining structure (properties) and behavior (methods).
- Classes are **final by default** in Kotlin (use \`open\` to allow inheritance)
- Class metadata stored in **Metaspace** (JVM memory)

**Object** = Instance of a class with actual values.
- Objects live on **Heap** memory
- References live on **Stack** memory

\`\`\`kotlin
class Car(val brand: String, var speed: Int) {
    fun accelerate() { speed += 10 }
}
val myCar = Car("Toyota", 0)  // myCar = Stack, Car object = Heap
\`\`\`

---

## 2. Class Types

| Feature | Class | Abstract Class | Interface |
|---------|-------|----------------|-----------|
| Instantiate? | ✅ Yes | ❌ No | ❌ No |
| Hold State? | ✅ Yes | ✅ Yes | ❌ No |
| Constructors? | ✅ Yes | ✅ Yes | ❌ No |
| Multiple Inherit? | ❌ No | ❌ No | ✅ Yes |

- **Abstract Class**: IS-A relationship, can hold state
- **Interface**: CAN-DO relationship, no state (avoids Diamond Problem)

---

## 3. Inheritance

**Inheritance** = Child class acquires properties/behaviors from parent class.

- Use \`open\` keyword to allow class/method inheritance
- Use \`override\` keyword when overriding
- **Constructor order**: Parent first → Child init → Child constructor

\`\`\`kotlin
open class Animal(val name: String) {
    open fun makeSound() = println("Sound")
}
class Dog(name: String) : Animal(name) {
    override fun makeSound() = println("Woof!")
}
\`\`\`

**Polymorphism** = One interface, multiple implementations (vtable lookup at runtime).

---

## 4. Data Classes vs Enum Classes

**Data Class** = Holds data, auto-generates: equals(), hashCode(), toString(), copy(), componentN()
- Requires at least one property in constructor
- Cannot be abstract, open, sealed, or inner

**Enum Class** = Fixed set of singleton constants
- Exhaustive in \`when\` expressions
- Can have properties and methods

| Use Case | Data Class | Enum Class |
|----------|------------|------------|
| Varying data | ✅ | ❌ |
| Fixed values | ❌ | ✅ |
| Multiple instances | ✅ | ❌ (singletons) |

**Sealed Class** = Best of both: exhaustive when + can hold state

---

## 5. Threads vs Coroutines

| Feature | Thread | Coroutine |
|---------|--------|-----------|
| Memory | ~1-2MB stack | ~few bytes |
| Managed by | OS Kernel | User space |
| Context switch | Expensive (µs) | Cheap (ns) |
| Max count | Thousands | Millions |

**Dispatchers:**
- \`Main\` - UI updates
- \`IO\` - Network, DB, file operations
- \`Default\` - CPU-intensive work

\`\`\`kotlin
lifecycleScope.launch {
    val result = withContext(Dispatchers.IO) { networkCall() }
    textView.text = result  // Back on Main
}
\`\`\`

---

## 6. Activity & Lifecycle

**Activity** = Single screen with UI, entry point for user interaction.

**Lifecycle Callbacks:**
1. onCreate() → onStart() → onResume() (visible, interactive)
2. onPause() → onStop() (going to background)
3. onDestroy() (being destroyed)

**Configuration Change** (rotation): Activity destroyed and recreated!
- Use \`ViewModel\` to survive configuration changes
- Bundle limit: 1MB

**Context Types:**
- Application Context - Singleton, lives with app
- Activity Context - Tied to lifecycle (⚠️ Don't store in singleton = memory leak!)

---

## 7. Layouts

| Layout | Use Case | Performance |
|--------|----------|-------------|
| LinearLayout | Simple row/column | Good (avoid nested weights) |
| ConstraintLayout | Complex layouts | Best (flat hierarchy) |
| FrameLayout | Stacking/fragments | Good |

**Double Taxation** = Nested LinearLayouts with weights cause exponential measure passes.

---

## 8. Jetpack Compose vs XML

| Aspect | XML | Compose |
|--------|-----|---------|
| Language | XML + Kotlin | Pure Kotlin |
| Paradigm | Imperative | Declarative |
| Updates | Manual | Automatic (recomposition) |

**Recomposition** = Compose re-executes composables when state changes.
- \`remember { }\` - survive recomposition
- \`mutableStateOf()\` - triggers recomposition

---

## 9. RecyclerView vs ScrollView

**ScrollView** = Creates ALL views at once → memory crash with large lists!

**RecyclerView** = Only creates visible views (~10-15), recycles off-screen views.
- **ViewHolder** = Caches view references (avoids repeated findViewById)
- \`onCreateViewHolder\` - called when new view needed
- \`onBindViewHolder\` - called to bind data to view

---

## 10. APIs and API Keys

**API** = Contract defining how software components communicate.
**API Key** = Secret token for authentication, rate limiting, billing.

**Best Practices:**
- Store in \`local.properties\` (not in git)
- Restrict keys (package name + SHA-1)
- Never hardcode in source!

---

## 11-12. Google Maps

**Uses:** Location display, navigation, markers, geofencing.

**Setup:** API key in manifest, Maps SDK dependency.

**CRITICAL:** MapView uses OpenGL - must forward lifecycle events!
\`\`\`kotlin
override fun onCreate() { mapView.onCreate(savedInstanceState) }
override fun onResume() { mapView.onResume() }
override fun onDestroy() { mapView.onDestroy() }
\`\`\`

**Lite Mode** = Static bitmap for low-memory scenarios.

---

## 13. Kotlin vs Java

| Feature | Kotlin | Java |
|---------|--------|------|
| Null Safety | ✅ Compile-time | ❌ Runtime NPE |
| Data Classes | ✅ Built-in | ❌ Manual/Lombok |
| Extension Functions | ✅ Yes | ❌ No |
| Coroutines | ✅ Native | ❌ External libs |
| Default Final | ✅ Yes | ❌ No (open) |
| Checked Exceptions | ❌ No | ✅ Yes |

**Platform Type (String!)** = Java type with unknown nullability.
**@JvmStatic** = Makes companion function callable as static from Java.
**@JvmOverloads** = Generates overloaded methods for default parameters.

---

## 14. Local Notifications

**Notification Channel** (Android 8+) = Required category with user-controlled settings.

\`\`\`kotlin
val channel = NotificationChannel("id", "Name", IMPORTANCE_HIGH)
notificationManager.createNotificationChannel(channel)
\`\`\`

**PendingIntent** = Token allowing system to perform actions as your app.
**POST_NOTIFICATIONS** permission required on Android 13+!

---

## 15. Push Notifications (FCM)

| Aspect | Local | Push |
|--------|-------|------|
| Origin | App itself | Remote server |
| Internet | Not required | Required |
| Service | None | FCM |

**FCM Flow:**
1. App registers → gets token
2. Token sent to backend
3. Backend sends to FCM
4. FCM delivers to device

**Message Types:**
- Notification: Auto-displayed by system (background)
- Data: Always to onMessageReceived() (full control)

**Doze Mode:** High priority messages bypass, standard delayed.
`;

// QUIZ QUESTIONS - Comprehensive exam preparation
const EXAM_QUIZ: QuizQuestion[] = [
    // Objects & Classes
    {
        topic: "Objects & Classes",
        question: "Where is the object stored when you write: val car = Car()?",
        options: ["Stack only", "Heap only", "Reference on Stack, object on Heap", "Metaspace"],
        correctIndex: 2,
        explanation: "Reference variable 'car' is on Stack, actual Car object is on Heap."
    },
    {
        topic: "Objects & Classes",
        question: "What makes Kotlin classes different from Java classes by default?",
        options: ["They are open by default", "They are final by default", "They are abstract by default", "They are sealed by default"],
        correctIndex: 1,
        explanation: "Kotlin classes are final by default - you must mark them 'open' to allow inheritance."
    },
    // Class Types
    {
        topic: "Class Types",
        question: "What is the KEY difference between abstract class and interface regarding state?",
        options: ["No difference", "Abstract class CAN hold state, interface CANNOT", "Interface CAN hold state", "Both cannot hold state"],
        correctIndex: 1,
        explanation: "Abstract classes can have properties with backing fields (state), interfaces cannot."
    },
    {
        topic: "Class Types",
        question: "How many interfaces can a Kotlin class implement?",
        options: ["Only one", "Maximum two", "Unlimited", "Same as abstract classes"],
        correctIndex: 2,
        explanation: "A class can implement unlimited interfaces, but extend only one class."
    },
    // Inheritance
    {
        topic: "Inheritance",
        question: "In what order do constructors execute?",
        options: ["Child first", "Parent first, then child", "Both simultaneously", "Random order"],
        correctIndex: 1,
        explanation: "Parent constructor always executes before child constructor."
    },
    {
        topic: "Inheritance",
        question: "What is a vtable (Virtual Method Table)?",
        options: ["Database table", "Table mapping methods to implementations for polymorphism", "Memory table", "Variable table"],
        correctIndex: 1,
        explanation: "vtable enables polymorphism by mapping method calls to correct implementations at runtime."
    },
    // Data Classes
    {
        topic: "Data Classes",
        question: "What methods does a data class automatically generate?",
        options: ["Only toString()", "equals(), hashCode(), toString(), copy(), componentN()", "Only copy()", "None"],
        correctIndex: 1,
        explanation: "Data classes auto-generate all these methods for you."
    },
    {
        topic: "Data Classes",
        question: "Are enum entries singletons or multiple instances?",
        options: ["Multiple instances", "Singletons", "Depends on usage", "Abstract"],
        correctIndex: 1,
        explanation: "Each enum entry is a static final singleton."
    },
    // Coroutines
    {
        topic: "Coroutines",
        question: "What is the main advantage of coroutines over threads?",
        options: ["Faster execution", "Lightweight - can create millions", "Easier to debug", "Better security"],
        correctIndex: 1,
        explanation: "Coroutines are extremely lightweight (bytes vs MB)."
    },
    {
        topic: "Coroutines",
        question: "Which Dispatcher should you use for network calls?",
        options: ["Main", "IO", "Default", "Unconfined"],
        correctIndex: 1,
        explanation: "Dispatchers.IO is optimized for I/O operations."
    },
    {
        topic: "Coroutines",
        question: "Which Dispatcher for heavy CPU calculations?",
        options: ["Main", "IO", "Default", "Unconfined"],
        correctIndex: 2,
        explanation: "Dispatchers.Default uses thread pool sized to CPU cores."
    },
    // Activity
    {
        topic: "Activity",
        question: "In what order are lifecycle methods called when opening an Activity?",
        options: ["onStart → onCreate → onResume", "onCreate → onStart → onResume", "onResume → onStart → onCreate", "onCreate → onResume → onStart"],
        correctIndex: 1,
        explanation: "onCreate (initialize) → onStart (visible) → onResume (interactive)."
    },
    {
        topic: "Activity",
        question: "What happens to an Activity when the device is rotated?",
        options: ["Nothing", "onPause only", "Destroyed and recreated", "onStop only"],
        correctIndex: 2,
        explanation: "Configuration changes cause Activity to be destroyed and recreated."
    },
    {
        topic: "Activity",
        question: "Why can storing Activity Context in a Singleton cause memory leak?",
        options: ["Singletons are slow", "Activity can't be garbage collected", "Context is too large", "Singletons don't work"],
        correctIndex: 1,
        explanation: "Singleton outlives Activity - Activity and views can't be garbage collected."
    },
    // Layouts
    {
        topic: "Layouts",
        question: "What is the main advantage of ConstraintLayout?",
        options: ["Simplest syntax", "Flat hierarchy for better performance", "Automatic animations", "Built-in scrolling"],
        correctIndex: 1,
        explanation: "ConstraintLayout enables complex layouts with flat hierarchy."
    },
    {
        topic: "Layouts",
        question: "What is 'double taxation' in LinearLayout?",
        options: ["Paying twice", "Exponential measure passes with nested weights", "Memory tax", "CPU fee"],
        correctIndex: 1,
        explanation: "Nested LinearLayouts with weights cause exponential measure passes."
    },
    // Compose
    {
        topic: "Compose",
        question: "What programming paradigm does Jetpack Compose use?",
        options: ["Imperative", "Declarative", "Procedural", "Object-oriented"],
        correctIndex: 1,
        explanation: "Compose is declarative - you describe what UI should look like."
    },
    {
        topic: "Compose",
        question: "What does 'remember' do in Compose?",
        options: ["Save to database", "Store value across recompositions", "Log to console", "Cache images"],
        correctIndex: 1,
        explanation: "remember preserves values across recompositions."
    },
    // RecyclerView
    {
        topic: "RecyclerView",
        question: "Why is RecyclerView more memory efficient than ScrollView?",
        options: ["Better compression", "Only creates views for visible items and recycles them", "Uses less memory per view", "Caches to disk"],
        correctIndex: 1,
        explanation: "RecyclerView only maintains ~10-15 views and recycles them as you scroll."
    },
    {
        topic: "RecyclerView",
        question: "What is the purpose of ViewHolder in RecyclerView?",
        options: ["Hold data", "Cache view references to avoid repeated findViewById", "Manage clicks", "Store images"],
        correctIndex: 1,
        explanation: "ViewHolder caches view references found once in onCreateViewHolder."
    },
    // API
    {
        topic: "API",
        question: "What is the main purpose of an API key?",
        options: ["Encrypt data", "Authenticate and identify your app", "Speed up requests", "Compress responses"],
        correctIndex: 1,
        explanation: "API keys authenticate your app for tracking, rate limiting, access control."
    },
    {
        topic: "API",
        question: "Where should you store API keys in Android?",
        options: ["Hardcoded", "In local.properties (not in git)", "In strings.xml", "In manifest"],
        correctIndex: 1,
        explanation: "local.properties is excluded from git by default."
    },
    // Maps
    {
        topic: "Maps",
        question: "Why must you forward lifecycle events to MapView?",
        options: ["Legal requirement", "To properly manage OpenGL/GPU resources", "For animations", "Optional"],
        correctIndex: 1,
        explanation: "MapView uses OpenGL - lifecycle methods ensure proper GPU resource management."
    },
    {
        topic: "Maps",
        question: "What is Lite Mode in Google Maps?",
        options: ["Dark theme", "Static bitmap for low-memory scenarios", "Offline mode", "Reduced API calls"],
        correctIndex: 1,
        explanation: "Lite Mode renders map as static bitmap, perfect for lists."
    },
    // Kotlin vs Java
    {
        topic: "Kotlin vs Java",
        question: "What is the main advantage of Kotlin's null safety?",
        options: ["Faster execution", "Catches null errors at compile time", "Uses less memory", "Better threading"],
        correctIndex: 1,
        explanation: "Kotlin's type system catches NPE at compile time, not runtime."
    },
    {
        topic: "Kotlin vs Java",
        question: "What does String! mean in Kotlin?",
        options: ["Non-nullable", "Nullable", "Platform type with unknown nullability", "Error"],
        correctIndex: 2,
        explanation: "Platform type from Java code without nullability annotations."
    },
    {
        topic: "Kotlin vs Java",
        question: "What annotation generates overloaded methods for Java callers?",
        options: ["@JvmStatic", "@JvmField", "@JvmOverloads", "@JvmName"],
        correctIndex: 2,
        explanation: "@JvmOverloads generates multiple method versions for default parameters."
    },
    // Notifications
    {
        topic: "Notifications",
        question: "What is required to post notifications on Android 8+?",
        options: ["Nothing special", "Notification Channel", "Root access", "Internet permission"],
        correctIndex: 1,
        explanation: "Since Android 8.0, notifications must be assigned to a NotificationChannel."
    },
    {
        topic: "Notifications",
        question: "What does PendingIntent do?",
        options: ["Delays notification", "Allows system to perform actions as your app", "Encrypts content", "Schedules reminders"],
        correctIndex: 1,
        explanation: "PendingIntent grants other apps/system permission to perform operations with your app's identity."
    },
    {
        topic: "Notifications",
        question: "What permission is required for notifications on Android 13+?",
        options: ["INTERNET", "POST_NOTIFICATIONS", "VIBRATE", "WAKE_LOCK"],
        correctIndex: 1,
        explanation: "Android 13 requires POST_NOTIFICATIONS runtime permission."
    },
    // Push Notifications
    {
        topic: "Push Notifications",
        question: "What is the main difference between local and push notifications?",
        options: ["Visual appearance", "Local from app, push from remote server", "Permission requirements", "Sound capability"],
        correctIndex: 1,
        explanation: "Local notifications are created by app itself, push come from remote server via FCM."
    },
    {
        topic: "Push Notifications",
        question: "What is the FCM payload size limit?",
        options: ["1 KB", "4 KB", "1 MB", "Unlimited"],
        correctIndex: 1,
        explanation: "FCM data payload is limited to 4096 bytes (4 KB)."
    },
    {
        topic: "Push Notifications",
        question: "When might the FCM token change?",
        options: ["Never", "Every app launch", "On reinstall, data clear, or new device", "Every hour"],
        correctIndex: 2,
        explanation: "Token changes on reinstall, data clear, or when restored to new device."
    },
    {
        topic: "Push Notifications",
        question: "How are push notifications delivered in Doze mode?",
        options: ["All immediately", "Standard delayed, high priority immediate", "All blocked", "Converted to SMS"],
        correctIndex: 1,
        explanation: "Standard priority batched/delayed, high priority bypass Doze."
    }
];

const ExamModule: React.FC = () => {
    const [mode, setMode] = useState<ExamMode>('theory');
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Shuffle questions for each session
    const shuffledQuestions = useMemo(() => {
        return [...EXAM_QUIZ].sort(() => Math.random() - 0.5);
    }, []);

    const handleOptionSelect = (qIndex: number, optIndex: number) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    };

    const handleSubmit = () => {
        let calculatedScore = 0;
        shuffledQuestions.forEach((q, i) => {
            if (answers[i] === q.correctIndex) calculatedScore++;
        });
        setScore(calculatedScore);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRetry = () => {
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
    };

    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let gradeColor = 'text-blue-400';
    if (percentage >= 90) gradeColor = 'text-emerald-400';
    if (percentage < 60) gradeColor = 'text-red-400';

    return (
        <div className="max-w-5xl mx-auto p-8 animate-fade-in">
            {/* Header */}
            <header className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <span className="text-orange-600 dark:text-orange-400 text-sm font-mono uppercase tracking-wider">EXAM PREPARATION</span>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-2">📝 Quiz & Theory Minimum</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">Condensed exam material covering all 15 topics</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setMode('theory')}
                            className={`px-6 py-3 rounded-lg font-bold transition-all ${mode === 'theory'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent gap-2'
                                }`}
                        >
                            📚 Theory
                        </button>
                        <button
                            onClick={() => setMode('quiz')}
                            className={`px-6 py-3 rounded-lg font-bold transition-all ${mode === 'quiz'
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/30'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-transparent gap-2'
                                }`}
                        >
                            🎯 Quiz ({shuffledQuestions.length} Qs)
                        </button>
                    </div>
                </div>
            </header>

            {/* Theory Mode */}
            {mode === 'theory' && (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-700" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-12 mb-4" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-white/5 px-1 rounded" {...props} />,
                            table: ({ node, ...props }) => <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700"><table className="w-full text-left border-collapse" {...props} /></div>,
                            thead: ({ node, ...props }) => <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" {...props} />,
                            tbody: ({ node, ...props }) => <tbody className="bg-white dark:bg-slate-900/50 divide-y divide-slate-200 dark:divide-slate-800" {...props} />,
                            tr: ({ node, ...props }) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" {...props} />,
                            th: ({ node, ...props }) => <th className="p-3 font-semibold text-sm border-b border-slate-200 dark:border-slate-700" {...props} />,
                            td: ({ node, ...props }) => <td className="p-3 text-sm border-r border-slate-100 dark:border-slate-700/50 last:border-0" {...props} />,
                            hr: ({ node, ...props }) => <hr className="border-slate-200 dark:border-slate-700 my-8" {...props} />,
                            code: ({ node, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <pre className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 my-4 overflow-x-auto">
                                        <code className="text-sm text-slate-700 dark:text-slate-300 font-mono">{children}</code>
                                    </pre>
                                ) : (
                                    <code className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200 dark:border-transparent" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {EXAM_THEORY}
                    </ReactMarkdown>
                </div >
            )}

            {/* Quiz Mode */}
            {
                mode === 'quiz' && (
                    <div>
                        {/* Score Header */}
                        {isSubmitted && (
                            <div className={`mb-8 p-6 rounded-xl border ${percentage >= 60 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500/50' : 'bg-red-50 dark:bg-red-900/20 border-red-500/50'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Results</h2>
                                        <p className="text-slate-500 dark:text-slate-400">Answered {Object.keys(answers).length} of {shuffledQuestions.length} questions</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-4xl font-black ${gradeColor}`}>{percentage}%</div>
                                        <div className="text-slate-500 dark:text-slate-400">Score: {score} / {shuffledQuestions.length}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Questions */}
                        <div className="space-y-6">
                            {shuffledQuestions.map((q, qIndex) => {
                                const isCorrect = answers[qIndex] === q.correctIndex;
                                const showResult = isSubmitted;
                                const isAnswered = answers[qIndex] !== undefined;

                                return (
                                    <div
                                        key={qIndex}
                                        className={`p-6 rounded-xl border transition-all ${showResult
                                            ? isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500/50' : 'bg-red-50 dark:bg-red-900/10 border-red-500/50'
                                            : isAnswered ? 'bg-white dark:bg-slate-800 border-blue-500/30 shadow-md' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                                            }`}
                                    >
                                        <div className="flex gap-4 mb-4">
                                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-sm border border-slate-300 dark:border-slate-600">
                                                {qIndex + 1}
                                            </span>
                                            <div className="flex-1">
                                                <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider">{q.topic}</span>
                                                <p className="font-medium text-lg text-slate-900 dark:text-slate-100 mt-1">{q.question}</p>
                                            </div>
                                        </div>

                                        <div className="pl-12 space-y-2">
                                            {q.options.map((opt, optIndex) => {
                                                let optionClass = "p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between text-sm ";

                                                if (showResult) {
                                                    if (optIndex === q.correctIndex) {
                                                        optionClass += "bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-100";
                                                    } else if (answers[qIndex] === optIndex && optIndex !== q.correctIndex) {
                                                        optionClass += "bg-red-500/20 border-red-500 text-red-900 dark:text-red-100";
                                                    } else {
                                                        optionClass += "bg-white dark:bg-slate-900 border-transparent opacity-40 grayscale";
                                                    }
                                                } else {
                                                    if (answers[qIndex] === optIndex) {
                                                        optionClass += "bg-blue-600 border-blue-500 text-white shadow-md";
                                                    } else {
                                                        optionClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300";
                                                    }
                                                }

                                                return (
                                                    <div
                                                        key={optIndex}
                                                        onClick={() => handleOptionSelect(qIndex, optIndex)}
                                                        className={optionClass}
                                                    >
                                                        {opt}
                                                        {showResult && optIndex === q.correctIndex && (
                                                            <span className="ml-2 text-[10px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded uppercase">Correct</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {showResult && (
                                            <div className="mt-4 ml-12 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border-l-4 border-blue-500 text-slate-600 dark:text-slate-300 text-sm">
                                                <strong className="text-blue-600 dark:text-blue-400 block mb-1 uppercase text-xs">Explanation</strong>
                                                {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Submit/Retry Buttons */}
                        <div className="flex gap-4 mt-8 pb-12">
                            {!isSubmitted ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length !== shuffledQuestions.length}
                                    className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl"
                                >
                                    {Object.keys(answers).length !== shuffledQuestions.length
                                        ? `Answer all ${shuffledQuestions.length} questions to submit`
                                        : 'Submit Exam'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleRetry}
                                    className="flex-1 py-4 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-xl font-bold text-lg transition border border-slate-200 dark:border-slate-500"
                                >
                                    Retake Exam
                                </button>
                            )}
                            <button
                                onClick={() => setMode('theory')}
                                className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                            >
                                Review Theory
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ExamModule;
