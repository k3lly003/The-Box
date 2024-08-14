import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ANNOTATIONS = [
    // ── App Bootstrap ──────────────────────────────────────────────────────────
    {
        category: "App Bootstrap",
        name: "@SpringBootApplication",
        q: "What does @SpringBootApplication do?",
        a: "Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan in one — the main entry point of any Spring Boot app.",
        distractors: [
            "Only enables component scanning across all packages",
            "Configures the embedded web server and security",
            "Enables only auto-configuration without component scanning",
        ],
    },
    {
        category: "App Bootstrap",
        name: "@EnableAutoConfiguration",
        q: "What is the purpose of @EnableAutoConfiguration?",
        a: "Tells Spring Boot to automatically configure beans based on the dependencies found on the classpath.",
        distractors: [
            "Manually registers all application beans",
            "Enables database auto-migrations on startup",
            "Scans packages for @Component classes",
        ],
    },
    {
        category: "App Bootstrap",
        name: "@ComponentScan",
        q: "What does @ComponentScan do?",
        a: "Scans the specified package (and sub-packages) for Spring-annotated components and registers them as beans.",
        distractors: [
            "Registers beans defined in XML files",
            "Scans the database schema for entity classes",
            "Enables REST endpoint discovery",
        ],
    },
    {
        category: "App Bootstrap",
        name: "@SpringBootConfiguration",
        q: "What is @SpringBootConfiguration and when is it used?",
        a: "A specialization of @Configuration indicating a Spring Boot configuration class. It is included inside @SpringBootApplication and rarely needed on its own.",
        distractors: [
            "Configures the embedded server port and SSL",
            "Enables configuration file loading from the classpath",
            "Marks a class that provides database configuration only",
        ],
    },

    // ── Dependency Injection ───────────────────────────────────────────────────
    {
        category: "Dependency Injection",
        name: "@Component",
        q: "What does @Component do in Spring?",
        a: "Marks a class as a generic Spring-managed bean, making it eligible for auto-detection and registration in the application context.",
        distractors: [
            "Marks a class as a REST controller",
            "Marks a class as a JPA entity",
            "Marks a class as a configuration source",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Service",
        q: "How does @Service differ from @Component?",
        a: "@Service is a specialization of @Component used to indicate the business-logic (service) layer. Functionally identical, but semantically clearer.",
        distractors: [
            "@Service automatically adds transaction management",
            "@Service is required for all REST-facing beans",
            "@Service creates a new instance per request by default",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Repository",
        q: "What extra capability does @Repository add over @Component?",
        a: "It translates low-level database (persistence) exceptions into Spring's DataAccessException hierarchy, making error handling consistent.",
        distractors: [
            "It automatically generates CRUD methods for the class",
            "It connects the class to the configured DataSource",
            "It caches all database query results automatically",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Autowired",
        q: "What does @Autowired do and where can it be applied?",
        a: "Injects a Spring bean automatically by type. It can be applied to fields, constructors, or setter methods.",
        distractors: [
            "Creates a new instance of a class on demand",
            "Marks a class as a Spring-managed singleton",
            "Defines a REST endpoint mapping",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Qualifier",
        q: "When do you need @Qualifier alongside @Autowired?",
        a: "When multiple beans of the same type exist in the context and you need to specify exactly which one should be injected by name.",
        distractors: [
            "To mark the highest-priority bean for injection",
            "To exclude a bean from the component scan",
            "To make injection optional if the bean is missing",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Primary",
        q: "What problem does @Primary solve?",
        a: "When multiple beans of the same type exist, @Primary marks one as the default, so Spring picks it without needing @Qualifier everywhere.",
        distractors: [
            "Makes a bean initialize before all others at startup",
            "Prevents other beans of the same type from being registered",
            "Sets the bean's thread priority to the highest level",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Lazy",
        q: "What is the effect of marking a bean with @Lazy?",
        a: "The bean is not created at application startup — its creation is deferred until it is first requested from the context.",
        distractors: [
            "The bean's methods run with a lower thread priority",
            "The bean caches its return values after first call",
            "The bean is created in a background thread during startup",
        ],
    },
    {
        category: "Dependency Injection",
        name: "@Scope",
        q: "What does @Scope control, and which value creates a new instance each time?",
        a: "@Scope controls the bean lifecycle. @Scope(\"prototype\") creates a new bean instance every time it is requested.",
        distractors: [
            "@Scope controls which profiles activate the bean",
            "@Scope(\"request\") is the default and most common scope",
            "@Scope determines the bean's transaction boundary",
        ],
    },

    // ── Configuration ──────────────────────────────────────────────────────────
    {
        category: "Configuration",
        name: "@Configuration",
        q: "What is a @Configuration class?",
        a: "A class that defines Spring beans using @Bean-annotated methods, effectively replacing XML-based configuration.",
        distractors: [
            "A class that configures only the database connection",
            "A class that registers REST controllers with the servlet",
            "A class read at compile time to configure build options",
        ],
    },
    {
        category: "Configuration",
        name: "@Bean",
        q: "What does @Bean do inside a @Configuration class?",
        a: "Declares that a method's return value should be registered as a Spring bean in the application context.",
        distractors: [
            "Marks a field for dependency injection",
            "Marks a class as a Spring-managed component",
            "Defines a REST API endpoint",
        ],
    },
    {
        category: "Configuration",
        name: "@Value",
        q: "How is @Value used in Spring Boot?",
        a: "Injects a single value from application.properties, application.yml, or environment variables into a field using the ${property.key} syntax.",
        distractors: [
            "Validates that a field meets a minimum numeric value",
            "Sets a constant compile-time value on a field",
            "Converts a String field to a numeric type automatically",
        ],
    },
    {
        category: "Configuration",
        name: "@ConfigurationProperties",
        q: "What advantage does @ConfigurationProperties have over @Value?",
        a: "It binds an entire group of related properties (by a shared prefix) to a POJO, enabling type-safe, structured configuration.",
        distractors: [
            "It validates each property value against a regex",
            "It supports loading properties from a remote HTTP source",
            "It loads properties lazily only when the bean is first used",
        ],
    },
    {
        category: "Configuration",
        name: "@PropertySource",
        q: "What does @PropertySource do?",
        a: "Loads a specific .properties file into the Spring Environment, making its values available for @Value injection.",
        distractors: [
            "Enables loading YAML files as configuration sources",
            "Forces Spring to reload properties on every request",
            "Marks a class as the primary source of all configuration",
        ],
    },
    {
        category: "Configuration",
        name: "@Profile",
        q: "What is @Profile used for?",
        a: "Makes a bean or configuration class active only when a specific Spring profile (e.g., \"dev\" or \"prod\") is active.",
        distractors: [
            "Runs performance profiling on the annotated bean",
            "Logs bean creation duration to a metrics system",
            "Marks a bean as optional — it won't fail if missing",
        ],
    },
    {
        category: "Configuration",
        name: "@Conditional",
        q: "What is @Conditional and what is it the base of?",
        a: "Registers a bean only when a custom Condition implementation returns true. It is the base annotation for all @ConditionalOn* variants.",
        distractors: [
            "Registers a bean only if a named property exists",
            "Makes a bean conditional on the active Spring profile",
            "Registers a bean only if the application is in test mode",
        ],
    },
    {
        category: "Configuration",
        name: "@ConditionalOnProperty",
        q: "What does @ConditionalOnProperty do?",
        a: "Registers a bean only if a specific property key has a given value in the configuration. Ideal for feature flags.",
        distractors: [
            "Validates property types and throws on mismatch",
            "Sets a default value for a missing property",
            "Fetches property values from a remote configuration server",
        ],
    },
    {
        category: "Configuration",
        name: "@ConditionalOnMissingBean",
        q: "When does @ConditionalOnMissingBean register a bean?",
        a: "Only when no other bean of the specified type has already been registered in the context — used heavily in Spring Boot's auto-configuration.",
        distractors: [
            "When the bean's dependency is absent from the classpath",
            "When the application is running without a database",
            "When the active profile is not 'production'",
        ],
    },

    // ── Web / REST ─────────────────────────────────────────────────────────────
    {
        category: "Web / REST",
        name: "@RestController",
        q: "What does @RestController combine and why is it preferred for APIs?",
        a: "It combines @Controller and @ResponseBody, so every method automatically serializes its return value to JSON (or XML) in the response body.",
        distractors: [
            "It adds @Transactional to every controller method",
            "It enables CORS for all endpoints automatically",
            "It restricts the controller to only GET and POST methods",
        ],
    },
    {
        category: "Web / REST",
        name: "@Controller",
        q: "When would you use @Controller instead of @RestController?",
        a: "When building an MVC app that returns view names (e.g., Thymeleaf templates) rather than raw JSON data.",
        distractors: [
            "When you need to handle file uploads",
            "When you need to define global exception handlers",
            "When the controller has only one endpoint",
        ],
    },
    {
        category: "Web / REST",
        name: "@RequestMapping",
        q: "What does @RequestMapping configure at the class or method level?",
        a: "Maps HTTP requests to a handler by specifying the URL path, HTTP method, content type, headers, and other request attributes.",
        distractors: [
            "Maps database queries to Java methods",
            "Maps bean names to their implementation classes",
            "Maps configuration keys to field values",
        ],
    },
    {
        category: "Web / REST",
        name: "@GetMapping",
        q: "What is @GetMapping a shortcut for?",
        a: "@GetMapping is a composed annotation equivalent to @RequestMapping(method = RequestMethod.GET). Use it to handle HTTP GET requests.",
        distractors: [
            "@RequestMapping(method = RequestMethod.POST)",
            "@RequestMapping(consumes = \"application/json\")",
            "@RequestMapping(produces = \"text/html\")",
        ],
    },
    {
        category: "Web / REST",
        name: "@PostMapping",
        q: "What HTTP operation is @PostMapping intended for?",
        a: "Handling HTTP POST requests — typically used for creating new resources.",
        distractors: [
            "Handling HTTP GET requests for listing resources",
            "Handling HTTP DELETE requests to remove resources",
            "Handling HTTP PUT requests to replace resources",
        ],
    },
    {
        category: "Web / REST",
        name: "@PutMapping",
        q: "What is the intended use of @PutMapping?",
        a: "Handling HTTP PUT requests — used for full replacement/update of an existing resource.",
        distractors: [
            "Handling partial updates to a resource",
            "Handling resource creation like POST",
            "Handling idempotent read operations",
        ],
    },
    {
        category: "Web / REST",
        name: "@PatchMapping",
        q: "How does @PatchMapping differ from @PutMapping?",
        a: "@PatchMapping handles HTTP PATCH requests, which are used for partial updates — only the provided fields are changed.",
        distractors: [
            "@PatchMapping handles full resource replacement",
            "@PatchMapping is used for deleting specific fields",
            "@PatchMapping handles idempotent creation",
        ],
    },
    {
        category: "Web / REST",
        name: "@DeleteMapping",
        q: "What is @DeleteMapping used for?",
        a: "Handling HTTP DELETE requests — used to delete a specific resource, often identified by a @PathVariable.",
        distractors: [
            "Handling HTTP PUT requests for resource removal",
            "Handling soft deletes via HTTP POST",
            "Handling cache eviction requests",
        ],
    },
    {
        category: "Web / REST",
        name: "@PathVariable",
        q: "What does @PathVariable do and give an example?",
        a: "Binds a segment of the URL path to a method parameter. E.g. GET /users/{id} → @PathVariable Long id extracts the id.",
        distractors: [
            "Binds a query string parameter to a method parameter",
            "Binds the entire request body to a method parameter",
            "Reads a value from the HTTP request headers",
        ],
    },
    {
        category: "Web / REST",
        name: "@RequestParam",
        q: "What does @RequestParam bind and give an example?",
        a: "Binds a query string parameter to a method parameter. E.g. GET /search?page=2 → @RequestParam int page.",
        distractors: [
            "Binds the JSON request body to a method parameter",
            "Binds a URL path segment to a method parameter",
            "Reads a cookie value from the request",
        ],
    },
    {
        category: "Web / REST",
        name: "@RequestBody",
        q: "What does @RequestBody do?",
        a: "Deserializes the HTTP request body (typically JSON) into a Java object using Spring's configured HttpMessageConverter (Jackson by default).",
        distractors: [
            "Serializes the return value to the HTTP response body",
            "Reads a file upload from a multipart request",
            "Reads a URL path segment from the request",
        ],
    },
    {
        category: "Web / REST",
        name: "@ResponseBody",
        q: "What does @ResponseBody do and is it needed with @RestController?",
        a: "Serializes a method's return value directly to the HTTP response body. It is already included in @RestController, so you don't need it explicitly there.",
        distractors: [
            "Sets the HTTP response status code",
            "Reads and validates the response body before sending",
            "Converts the response to a specific media type",
        ],
    },
    {
        category: "Web / REST",
        name: "@ResponseStatus",
        q: "What does @ResponseStatus control?",
        a: "Sets the HTTP status code returned by a controller method or exception handler. E.g. @ResponseStatus(HttpStatus.CREATED) returns 201.",
        distractors: [
            "Sets the Content-Type header of the response",
            "Returns the response as a specific body format",
            "Validates the response body before it is sent",
        ],
    },
    {
        category: "Web / REST",
        name: "@CrossOrigin",
        q: "What does @CrossOrigin enable?",
        a: "Cross-Origin Resource Sharing (CORS), allowing a browser to call the API from a different origin (domain, port, or protocol).",
        distractors: [
            "Cross-server bean sharing between Spring contexts",
            "Sharing authentication tokens across services",
            "Enabling multi-module project communication",
        ],
    },
    {
        category: "Web / REST",
        name: "@ExceptionHandler",
        q: "What does @ExceptionHandler do inside a controller?",
        a: "Handles a specific exception thrown by controller methods in the same class, letting you return a custom HTTP response instead of a 500 error.",
        distractors: [
            "Catches all JVM-level exceptions globally",
            "Logs exceptions to an external monitoring system",
            "Automatically retries failed HTTP requests",
        ],
    },
    {
        category: "Web / REST",
        name: "@ControllerAdvice",
        q: "What is @ControllerAdvice used for?",
        a: "Applies @ExceptionHandler, @ModelAttribute, and @InitBinder globally across all controllers from a single class.",
        distractors: [
            "Adds logging middleware to every controller method",
            "Validates all incoming request bodies globally",
            "Enables security rules across all controller endpoints",
        ],
    },
    {
        category: "Web / REST",
        name: "@RestControllerAdvice",
        q: "How does @RestControllerAdvice differ from @ControllerAdvice?",
        a: "It combines @ControllerAdvice with @ResponseBody so that all exception handler methods automatically serialize their return value to JSON.",
        distractors: [
            "It adds @Transactional to all advice methods",
            "It restricts the advice to async REST controllers only",
            "It enables asynchronous exception handling",
        ],
    },

    // ── Data / JPA ─────────────────────────────────────────────────────────────
    {
        category: "Data / JPA",
        name: "@Entity",
        q: "What does @Entity do in JPA?",
        a: "Marks a Java class as a JPA entity, mapping it to a database table. Every entity requires a field annotated with @Id.",
        distractors: [
            "Marks a class as a Spring-managed bean",
            "Defines a REST resource endpoint",
            "Marks a class as a value object (not persisted)",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Table",
        q: "What does @Table customize on a JPA entity?",
        a: "Customizes the database table name and schema that the entity maps to. E.g. @Table(name = \"users\").",
        distractors: [
            "Creates an index on the entity's primary key",
            "Defines the column order in the generated table",
            "Specifies the database connection to use for the entity",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Id",
        q: "What is the role of @Id in a JPA entity?",
        a: "Marks the primary key field of the entity. Every @Entity must have exactly one @Id field.",
        distractors: [
            "Marks a unique index field",
            "Marks the field that identifies a foreign key",
            "Sets the auto-increment strategy for numeric fields",
        ],
    },
    {
        category: "Data / JPA",
        name: "@GeneratedValue",
        q: "What does @GeneratedValue configure?",
        a: "Configures the primary key generation strategy: AUTO, IDENTITY, SEQUENCE, or TABLE. GenerationType.IDENTITY delegates to the DB's auto-increment.",
        distractors: [
            "Generates default values for all nullable fields",
            "Creates a UUID for every non-key field",
            "Generates the DDL schema from the entity class",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Column",
        q: "What does @Column allow you to customize?",
        a: "Customizes the database column mapping — name, nullable, length, precision, scale, unique constraint, and whether it is insertable or updatable.",
        distractors: [
            "Customizes the JSON field name in API responses",
            "Sets a validation constraint on the field",
            "Maps the field to a specific database index",
        ],
    },
    {
        category: "Data / JPA",
        name: "@OneToMany",
        q: "What relationship does @OneToMany define?",
        a: "A one-to-many relationship where one entity (e.g., Order) has a collection of related entities (e.g., OrderItems). The 'many' side holds the foreign key.",
        distractors: [
            "A many-to-many relationship via a join table",
            "A one-to-one exclusive relationship",
            "A self-referential parent-child relationship only",
        ],
    },
    {
        category: "Data / JPA",
        name: "@ManyToOne",
        q: "What does @ManyToOne define and which side owns it?",
        a: "A many-to-one relationship. It goes on the owning side (the side with the foreign key column) and is usually paired with @JoinColumn.",
        distractors: [
            "A one-to-many relationship from the parent side",
            "A many-to-many relationship requiring a join table",
            "A unidirectional relationship from parent to children",
        ],
    },
    {
        category: "Data / JPA",
        name: "@ManyToMany",
        q: "How does @ManyToMany work in JPA?",
        a: "Defines a many-to-many relationship between two entities using a join table. Use @JoinTable to customize the join table's name and columns.",
        distractors: [
            "Creates a direct foreign key between two entities",
            "Reuses a shared primary key across two tables",
            "Creates multiple @OneToMany relationships automatically",
        ],
    },
    {
        category: "Data / JPA",
        name: "@OneToOne",
        q: "What does @OneToOne define and which side uses @JoinColumn?",
        a: "A one-to-one relationship between two entities. The owning side (which has the foreign key) uses @JoinColumn.",
        distractors: [
            "A relationship where both sides share the same primary key only",
            "A one-to-many where only one child is allowed",
            "A bidirectional many-to-many capped at one result",
        ],
    },
    {
        category: "Data / JPA",
        name: "@JoinColumn",
        q: "What does @JoinColumn specify?",
        a: "Specifies the foreign key column used in a relationship (e.g. @JoinColumn(name = \"user_id\")) on the owning side of the association.",
        distractors: [
            "Specifies the join table for a many-to-many relationship",
            "Defines a composite primary key for an entity",
            "Creates a database index on the specified column",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Transient",
        q: "What does @Transient tell JPA?",
        a: "Marks a field to be ignored by JPA — it will not be persisted to or loaded from the database. Use for computed or temporary fields.",
        distractors: [
            "Marks a field as read-only from the database",
            "Marks a field as always null in the database",
            "Makes a field lazily loaded from the database",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Transactional",
        q: "What does @Transactional do and where should it be placed?",
        a: "Wraps the method (or all methods of a class) in a database transaction, rolling back automatically on unchecked exceptions. Best placed on service layer methods.",
        distractors: [
            "Locks the database table for the method's duration",
            "Enables lazy loading for all relationships in the method",
            "Makes the method run in a separate database connection",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Query",
        q: "What does @Query allow you to do on a Spring Data repository method?",
        a: "Define a custom JPQL or native SQL query directly on the method, overriding the derived-query mechanism. Add nativeQuery=true for plain SQL.",
        distractors: [
            "Cache the query results for a specified duration",
            "Automatically generate optimized SQL from the method name",
            "Log the query execution time to a metrics system",
        ],
    },
    {
        category: "Data / JPA",
        name: "@Modifying",
        q: "When is @Modifying required and what does it pair with?",
        a: "@Modifying is required on @Query methods that execute UPDATE or DELETE statements. It must be paired with @Transactional.",
        distractors: [
            "It is required for all repository methods that return Optional",
            "It enables batch inserts for collection parameters",
            "It is required when the query uses a native SQL join",
        ],
    },

    // ── Validation ─────────────────────────────────────────────────────────────
    {
        category: "Validation",
        name: "@Valid / @Validated",
        q: "What do @Valid and @Validated do on a controller method parameter?",
        a: "Trigger Bean Validation (JSR-380) on the annotated object, evaluating all constraints (@NotNull, @Size, etc.) on its fields.",
        distractors: [
            "Validate the SQL query generated by the repository",
            "Check authentication tokens in the request header",
            "Validate the HTTP method and path of the request",
        ],
    },
    {
        category: "Validation",
        name: "@NotNull",
        q: "What does @NotNull validate?",
        a: "That the annotated field is not null. It does not check for empty strings — use @NotBlank for string content.",
        distractors: [
            "That the annotated string is not empty or whitespace",
            "That the annotated number is greater than zero",
            "That the annotated collection has at least one element",
        ],
    },
    {
        category: "Validation",
        name: "@NotBlank",
        q: "What does @NotBlank validate and how does it differ from @NotEmpty?",
        a: "@NotBlank checks that a string is not null, not empty, and not whitespace-only. @NotEmpty allows whitespace-only strings.",
        distractors: [
            "@NotBlank checks that a collection is not empty",
            "@NotBlank is identical to @NotNull for strings",
            "@NotBlank checks a minimum string length of 1 character",
        ],
    },
    {
        category: "Validation",
        name: "@NotEmpty",
        q: "What does @NotEmpty validate?",
        a: "That a string, collection, map, or array is not null and not empty. Unlike @NotBlank, it allows whitespace-only strings.",
        distractors: [
            "That every element in a collection is not null",
            "That a string has no leading or trailing whitespace",
            "That a number field is not zero",
        ],
    },
    {
        category: "Validation",
        name: "@Size",
        q: "What does @Size validate?",
        a: "That the size of a string, collection, or array is within a specified min and max range. E.g. @Size(min=2, max=50).",
        distractors: [
            "That a numeric value is within a min-max range",
            "That a file upload is within the allowed size",
            "That a date field is within a given range",
        ],
    },
    {
        category: "Validation",
        name: "@Min / @Max",
        q: "What do @Min and @Max validate?",
        a: "That a numeric value is greater than or equal to @Min, or less than or equal to @Max. Use @DecimalMin/@DecimalMax for decimal numbers.",
        distractors: [
            "That a string length is within bounds",
            "That a collection has a bounded number of elements",
            "That a date is within a certain range",
        ],
    },
    {
        category: "Validation",
        name: "@Email",
        q: "What does @Email validate?",
        a: "That a string field conforms to a valid email address format. It does not verify whether the email actually exists.",
        distractors: [
            "That an email address exists and can receive messages",
            "That the email domain has a valid MX record",
            "That the email matches the authenticated user's address",
        ],
    },
    {
        category: "Validation",
        name: "@Pattern",
        q: "What does @Pattern validate and how is it used?",
        a: "That a string field matches a specified regular expression. E.g. @Pattern(regexp = \"[A-Z]{3}\") enforces three uppercase letters.",
        distractors: [
            "That the class follows a specific design pattern",
            "That a method name matches a naming convention",
            "That the field uses a valid date pattern format",
        ],
    },
    {
        category: "Validation",
        name: "@Positive / @Negative",
        q: "What do @Positive and @Negative validate?",
        a: "@Positive ensures a number is strictly greater than zero; @Negative ensures it is strictly less than zero. Use @PositiveOrZero / @NegativeOrZero to include zero.",
        distractors: [
            "@Positive checks that a number is not null",
            "@Negative marks a field as an inverse/complement value",
            "They validate the sign of boolean fields",
        ],
    },
    {
        category: "Validation",
        name: "@Past / @Future",
        q: "What do @Past and @Future validate on date fields?",
        a: "@Past ensures the date is before now; @Future ensures it is after now. @PastOrPresent and @FutureOrPresent also include the present moment.",
        distractors: [
            "@Past checks that a date is formatted correctly",
            "@Future checks that the date is in a specific timezone",
            "They validate that a date range is consistent",
        ],
    },

    // ── Testing ────────────────────────────────────────────────────────────────
    {
        category: "Testing",
        name: "@SpringBootTest",
        q: "What does @SpringBootTest do in a test class?",
        a: "Loads the full Spring application context for integration testing. It is the heaviest test slice — use more targeted slices when possible.",
        distractors: [
            "Tests only the web (controller) layer",
            "Tests only the JPA repositories in isolation",
            "Mocks all beans automatically for unit testing",
        ],
    },
    {
        category: "Testing",
        name: "@WebMvcTest",
        q: "What does @WebMvcTest load and why is it faster than @SpringBootTest?",
        a: "Loads only the web layer (controllers, filters, advice). It skips the service and repository layers, making it fast. Use @MockBean for missing dependencies.",
        distractors: [
            "Loads the full application context including the database",
            "Loads only the JPA layer and uses an in-memory DB",
            "Loads only security configuration for auth testing",
        ],
    },
    {
        category: "Testing",
        name: "@DataJpaTest",
        q: "What does @DataJpaTest load and what database does it use by default?",
        a: "Loads only JPA components (entities, repositories) and uses an embedded in-memory database (H2 by default) for fast, isolated database tests.",
        distractors: [
            "Loads the full context and connects to the real database",
            "Loads only the service layer with mocked repositories",
            "Loads only REST controllers and mocks the JPA layer",
        ],
    },
    {
        category: "Testing",
        name: "@MockBean",
        q: "What does @MockBean do that regular Mockito @Mock does not?",
        a: "It creates a Mockito mock AND registers it as a Spring bean in the test context, replacing the real bean — essential for @WebMvcTest.",
        distractors: [
            "It creates a spy on the real bean, not a full mock",
            "It stubs a specific method return value globally",
            "It disables the bean from being created during the test",
        ],
    },
    {
        category: "Testing",
        name: "@ExtendWith(SpringExtension.class)",
        q: "What does @ExtendWith(SpringExtension.class) do in JUnit 5?",
        a: "Integrates Spring's TestContext Framework with JUnit 5, enabling dependency injection in tests. It is already included in @SpringBootTest.",
        distractors: [
            "Extends the test timeout for slow integration tests",
            "Enables parameterized test support in Spring tests",
            "Adds Mockito support to Spring test classes",
        ],
    },
    {
        category: "Testing",
        name: "@TestPropertySource",
        q: "What does @TestPropertySource do?",
        a: "Overrides application properties specifically for a test class, useful for pointing to a test database or toggling feature flags in tests.",
        distractors: [
            "Loads a separate application.yml for the test profile",
            "Defines mock property values for @Value injection",
            "Enables @ConfigurationProperties binding in tests",
        ],
    },
    {
        category: "Testing",
        name: "@AutoConfigureMockMvc",
        q: "What does @AutoConfigureMockMvc do?",
        a: "Auto-configures a MockMvc instance so you can test HTTP endpoints without starting a real server. Used with @SpringBootTest.",
        distractors: [
            "Configures a real HTTP client for integration tests",
            "Enables WebTestClient for reactive endpoint testing",
            "Mocks all MVC-related beans in the context",
        ],
    },

    // ── Scheduling / Async ─────────────────────────────────────────────────────
    {
        category: "Scheduling / Async",
        name: "@EnableScheduling",
        q: "What does @EnableScheduling activate and where should it be placed?",
        a: "Activates Spring's task scheduling infrastructure. It must be placed on a @Configuration class (or on @SpringBootApplication).",
        distractors: [
            "Enables async method execution with @Async",
            "Enables cron-job-style scheduling at the OS level",
            "Enables event-driven messaging with @EventListener",
        ],
    },
    {
        category: "Scheduling / Async",
        name: "@Scheduled",
        q: "What does @Scheduled do and what options does it support?",
        a: "Runs a method on a defined schedule. Supports fixedRate, fixedDelay (in ms), and cron expressions. Requires @EnableScheduling.",
        distractors: [
            "Runs a method in a separate thread without a schedule",
            "Delays application startup by a specified milliseconds",
            "Queues a method call to run once after context refresh",
        ],
    },
    {
        category: "Scheduling / Async",
        name: "@EnableAsync",
        q: "What does @EnableAsync do?",
        a: "Enables Spring's asynchronous method execution support, allowing @Async-annotated methods to run in a thread pool.",
        distractors: [
            "Enables async HTTP requests in the web layer",
            "Enables reactive programming with Project Reactor",
            "Enables parallel database queries automatically",
        ],
    },
    {
        category: "Scheduling / Async",
        name: "@Async",
        q: "What does @Async do to a method and what should it return?",
        a: "Runs the method in a separate thread from a task executor, making it non-blocking. The method should return void or a Future<T> / CompletableFuture<T>.",
        distractors: [
            "Caches the method result asynchronously",
            "Runs the method with reduced thread priority",
            "Delays the method execution until the request completes",
        ],
    },

    // ── Security ───────────────────────────────────────────────────────────────
    {
        category: "Security",
        name: "@EnableWebSecurity",
        q: "What does @EnableWebSecurity do?",
        a: "Enables Spring Security's web security support. Pair it with a SecurityFilterChain @Bean to define custom authentication and authorization rules.",
        distractors: [
            "Enables HTTPS on all application endpoints automatically",
            "Enables OAuth2 login with a default provider",
            "Enables CSRF protection only (not full security)",
        ],
    },
    {
        category: "Security",
        name: "@PreAuthorize",
        q: "How does @PreAuthorize work?",
        a: "Evaluates a SpEL expression before the method executes. If the expression returns false, access is denied. E.g. @PreAuthorize(\"hasRole('ADMIN')\").",
        distractors: [
            "Runs authentication before the login endpoint is called",
            "Checks authorization after the method runs and inspects the result",
            "Encrypts method parameters before execution",
        ],
    },
    {
        category: "Security",
        name: "@PostAuthorize",
        q: "What makes @PostAuthorize different from @PreAuthorize?",
        a: "@PostAuthorize checks authorization after the method has run, and can inspect the return value via the 'returnObject' SpEL variable.",
        distractors: [
            "@PostAuthorize runs before the method and is stricter",
            "@PostAuthorize validates input parameters, not the result",
            "@PostAuthorize only works with HTTP POST endpoints",
        ],
    },
    {
        category: "Security",
        name: "@Secured",
        q: "How does @Secured differ from @PreAuthorize?",
        a: "@Secured restricts a method to one or more specified roles using simple string values. It does not support SpEL expressions unlike @PreAuthorize.",
        distractors: [
            "@Secured supports SpEL but @PreAuthorize does not",
            "@Secured is applied at the class level only",
            "@Secured is the newer replacement for @PreAuthorize",
        ],
    },
    {
        category: "Security",
        name: "@EnableMethodSecurity",
        q: "What does @EnableMethodSecurity enable and what did it replace?",
        a: "Enables method-level security annotations: @PreAuthorize, @PostAuthorize, @Secured. It replaces the older @EnableGlobalMethodSecurity.",
        distractors: [
            "Enables security only for @RestController classes",
            "Enables HTTPS and certificate management",
            "Enables security for scheduled and async methods only",
        ],
    },
];

const ERRORS = [
    // ── Startup ────────────────────────────────────────────────────────────────
    {
        category: "Startup Errors",
        name: "ApplicationContext failure",
        q: "Your app crashes at startup with 'ApplicationContext failed to start'. What does this mean?",
        a: "The Spring context could not be built because one or more beans failed to be created. Read deep into the stack trace to find the root cause.",
        distractors: [
            "Your database server is down or unreachable",
            "Your JAR or WAR file is missing or corrupted",
            "Your JVM version is incompatible with the Spring version",
        ],
    },
    {
        category: "Startup Errors",
        name: "Port already in use",
        q: "Spring Boot reports 'Port 8080 already in use'. How do you resolve it?",
        a: "Kill the process already using port 8080, or set server.port to a different value in application.properties.",
        distractors: [
            "Restart the database server to free the port",
            "Upgrade to the latest Spring Boot version",
            "Rename the application in application.properties",
        ],
    },
    {
        category: "Startup Errors",
        name: "Failed to configure DataSource",
        q: "What causes 'Failed to configure a DataSource'?",
        a: "Spring Boot detected a JPA dependency on the classpath but could not find database connection properties. Add DB credentials to application.properties or exclude DataSourceAutoConfiguration.",
        distractors: [
            "The @Entity classes are missing from the classpath",
            "Hibernate failed to load its dialect class",
            "The Spring Data repository interface is missing its @Repository annotation",
        ],
    },
    {
        category: "Startup Errors",
        name: "Consider defining a bean of type X",
        q: "You see 'Consider defining a bean of type X in your configuration'. What's wrong?",
        a: "Spring tried to inject a bean of type X but found none. The class is missing @Component/@Service, or it is outside the component scan path.",
        distractors: [
            "Two beans of the same type exist causing ambiguity",
            "The bean has a circular dependency with another bean",
            "The bean's scope is set to an unsupported value",
        ],
    },
    {
        category: "Startup Errors",
        name: "No qualifying bean of type X",
        q: "What does 'No qualifying bean of type X available' mean at startup?",
        a: "Spring tried to retrieve or inject a bean of the specified type from the context but found none. Check annotations and package scanning configuration.",
        distractors: [
            "Multiple qualifying beans of type X exist",
            "The bean was registered but then destroyed prematurely",
            "The bean's qualifier name contains a typo",
        ],
    },

    // ── Context / Wiring ───────────────────────────────────────────────────────
    {
        category: "Context / Wiring",
        name: "UnsatisfiedDependencyException",
        q: "What is UnsatisfiedDependencyException and what does it usually wrap?",
        a: "A bean's required dependency could not be satisfied during wiring. It usually wraps a NoSuchBeanDefinitionException — check the root cause in the stack trace.",
        distractors: [
            "A service method returned null when a value was expected",
            "A REST endpoint returned HTTP 500 unexpectedly",
            "A database query failed to return results",
        ],
    },
    {
        category: "Context / Wiring",
        name: "NoSuchBeanDefinitionException",
        q: "What causes NoSuchBeanDefinitionException?",
        a: "Spring looked for a bean of a specific type or name but found none in the context — the class is missing its stereotype annotation or is outside the scan path.",
        distractors: [
            "Two beans of the same type exist causing a conflict",
            "A circular dependency was detected between beans",
            "A bean was registered with an incompatible scope",
        ],
    },
    {
        category: "Context / Wiring",
        name: "NoUniqueBeanDefinitionException",
        q: "What causes NoUniqueBeanDefinitionException and how do you fix it?",
        a: "Spring found multiple beans of the same type and could not decide which to inject. Fix by adding @Primary to one bean, or @Qualifier on the injection point.",
        distractors: [
            "No bean of the required type was found in the context",
            "A bean was instantiated twice due to a configuration error",
            "A bean has duplicate field names causing a conflict",
        ],
    },
    {
        category: "Context / Wiring",
        name: "BeanCreationException",
        q: "What does BeanCreationException indicate?",
        a: "A bean could not be instantiated or initialized — typically caused by an exception thrown in the constructor, @PostConstruct method, or factory method.",
        distractors: [
            "A bean was accessed before the application context started",
            "A bean was garbage collected too early by the JVM",
            "A bean name contains characters that are not allowed",
        ],
    },
    {
        category: "Context / Wiring",
        name: "BeanCurrentlyInCreationException",
        q: "What is BeanCurrentlyInCreationException and how do you resolve it?",
        a: "Indicates a circular dependency — bean A requires B, and B requires A. Resolve by refactoring to break the cycle, or annotate one injection point with @Lazy.",
        distractors: [
            "A bean's constructor is taking too long to initialize",
            "A bean is being created on multiple threads simultaneously",
            "A @Bean factory method threw an exception during creation",
        ],
    },
    {
        category: "Context / Wiring",
        name: "PropertyValueException / BindException",
        q: "What causes PropertyValueException or BindException?",
        a: "A property value could not be bound to a bean field — usually a type mismatch or an invalid value in application.properties or application.yml.",
        distractors: [
            "A @Valid constraint failed on a request body field",
            "A @Value injection silently returned null",
            "The properties file was not found on the classpath",
        ],
    },

    // ── Web / HTTP ─────────────────────────────────────────────────────────────
    {
        category: "Web / HTTP",
        name: "404 Not Found (Whitelabel)",
        q: "A 404 Whitelabel Error Page appears. What is the most likely cause?",
        a: "Spring found no handler mapped to the requested URL. Check that the controller has the correct @RequestMapping path and the @RestController annotation.",
        distractors: [
            "The application database is unreachable",
            "A required Spring bean is missing from the context",
            "The embedded web server failed to start",
        ],
    },
    {
        category: "Web / HTTP",
        name: "405 Method Not Allowed",
        q: "What does HTTP 405 Method Not Allowed mean in Spring Boot?",
        a: "A controller method exists for the URL, but not for the HTTP method used — e.g. sending a POST request to a @GetMapping endpoint.",
        distractors: [
            "The endpoint requires authentication and the user is not logged in",
            "The JSON request body is malformed",
            "A required URL path variable is missing",
        ],
    },
    {
        category: "Web / HTTP",
        name: "400 Bad Request",
        q: "What typically causes a 400 Bad Request in Spring Boot?",
        a: "The request body or parameters failed validation (@Valid) or could not be deserialized from JSON — mismatched types or constraint violations.",
        distractors: [
            "The user does not have the required role for the endpoint",
            "The server threw an unhandled runtime exception",
            "The database returned no results for the query",
        ],
    },
    {
        category: "Web / HTTP",
        name: "415 Unsupported Media Type",
        q: "What causes HTTP 415 Unsupported Media Type?",
        a: "The request's Content-Type header does not match what the endpoint consumes. Most commonly, 'Content-Type: application/json' is missing from the request.",
        distractors: [
            "The response format is not supported by the client",
            "The uploaded file size exceeds the server limit",
            "The Accept header requested an unsupported format",
        ],
    },
    {
        category: "Web / HTTP",
        name: "HttpMessageNotReadableException",
        q: "What causes HttpMessageNotReadableException?",
        a: "Spring cannot parse the request body — the JSON is malformed, a field type is wrong (e.g. string where a number is expected), or the body is missing entirely.",
        distractors: [
            "The response body is too large to be sent",
            "A required HTTP request header is missing",
            "The user session has expired",
        ],
    },
    {
        category: "Web / HTTP",
        name: "MethodArgumentNotValidException",
        q: "What triggers MethodArgumentNotValidException?",
        a: "A @Valid annotation on a @RequestBody parameter failed — one or more fields did not pass Bean Validation constraints. Read the BindingResult for field-level details.",
        distractors: [
            "A method was called with the wrong number of Java arguments",
            "A required @PathVariable is missing from the URL",
            "A service method threw a business validation exception",
        ],
    },
    {
        category: "Web / HTTP",
        name: "MissingServletRequestParameterException",
        q: "What causes MissingServletRequestParameterException?",
        a: "A required @RequestParam is absent from the HTTP request. Fix by adding the parameter to the request, or set required=false with a defaultValue on the annotation.",
        distractors: [
            "A required @PathVariable is missing from the URL",
            "The request body is empty when data is expected",
            "A required HTTP header is missing from the request",
        ],
    },

    // ── Data / JPA ─────────────────────────────────────────────────────────────
    {
        category: "Data / JPA",
        name: "DataIntegrityViolationException",
        q: "What does DataIntegrityViolationException signal?",
        a: "A database constraint was violated — duplicate primary key, unique constraint breach, null inserted into a NOT NULL column, or a foreign key constraint failure.",
        distractors: [
            "The JPA entity is missing required mapping annotations",
            "A required relationship is not properly initialized",
            "The database query returned an unexpected number of results",
        ],
    },
    {
        category: "Data / JPA",
        name: "EntityNotFoundException",
        q: "What causes EntityNotFoundException and how should you avoid it?",
        a: "JPA could not find an entity with the given ID. Use repository.findById() which returns Optional — never use getById() (getOne/getReference) for safe lookups.",
        distractors: [
            "A required entity field is null after loading",
            "The entity class is missing its @Entity annotation",
            "The database connection was dropped during the query",
        ],
    },
    {
        category: "Data / JPA",
        name: "LazyInitializationException",
        q: "What is LazyInitializationException and why does it occur?",
        a: "You accessed a lazily-loaded association (e.g. a @OneToMany collection) outside of an active JPA session / transaction — the session was already closed.",
        distractors: [
            "An entity has too many relationships for Hibernate to handle",
            "Hibernate could not load the configured database driver",
            "The entity was deleted before you accessed it",
        ],
    },
    {
        category: "Data / JPA",
        name: "TransactionRequiredException",
        q: "What causes TransactionRequiredException?",
        a: "A write operation (INSERT, UPDATE, DELETE) was attempted without an active transaction. Add @Transactional to the service or repository method.",
        distractors: [
            "The current transaction timed out",
            "The database rejected the connection due to pool exhaustion",
            "A read operation was performed in write-only mode",
        ],
    },
    {
        category: "Data / JPA",
        name: "could not extract ResultSet",
        q: "What typically causes 'could not extract ResultSet' in Hibernate?",
        a: "A schema mismatch — the entity field names or types do not match the actual database column names or types. Check your @Column mappings.",
        distractors: [
            "The database storage is full",
            "The query returned too many rows for Hibernate to handle",
            "The connection pool was exhausted during the query",
        ],
    },
    {
        category: "Data / JPA",
        name: "Schema validation failed",
        q: "When does 'Schema validation failed' occur?",
        a: "When spring.jpa.hibernate.ddl-auto=validate and the entity mappings don't match the existing database schema. Fix the entity mapping or synchronize the schema.",
        distractors: [
            "application.properties contains syntax errors",
            "A Flyway or Liquibase migration script failed to run",
            "The database credentials have changed",
        ],
    },

    // ── Dependency Issues ──────────────────────────────────────────────────────
    {
        category: "Dependency Issues",
        name: "ClassNotFoundException",
        q: "What causes ClassNotFoundException in Spring Boot?",
        a: "A class needed at runtime is not on the classpath — usually a missing or excluded Maven/Gradle dependency. Add it to pom.xml or build.gradle.",
        distractors: [
            "The class was renamed after compilation",
            "The JVM ran out of heap memory",
            "A bean definition references the wrong package path",
        ],
    },
    {
        category: "Dependency Issues",
        name: "NoClassDefFoundError",
        q: "How does NoClassDefFoundError differ from ClassNotFoundException?",
        a: "The class existed at compile time but is absent at runtime — usually a version conflict or missing transitive dependency. Use dependency:tree to diagnose.",
        distractors: [
            "The class was never compiled into the project",
            "The class file is corrupted on disk",
            "The class loader was misconfigured in web.xml",
        ],
    },
    {
        category: "Dependency Issues",
        name: "IncompatibleClassChangeError",
        q: "What does IncompatibleClassChangeError indicate and how do you diagnose it?",
        a: "Two incompatible versions of the same class are on the classpath. Run 'mvn dependency:tree' or 'gradle dependencies' to find and resolve version conflicts.",
        distractors: [
            "Circular imports exist in your Java source files",
            "The application server requires a JVM restart",
            "The JDK version is too new for the library",
        ],
    },
    {
        category: "Dependency Issues",
        name: "StackOverflowError (circular proxy)",
        q: "A StackOverflowError appears at runtime involving Spring proxies. What is the usual cause?",
        a: "Circular bean references routed through AOP proxies — AOP wraps each call, creating infinite delegation. Refactor to eliminate the circular dependency.",
        distractors: [
            "Infinite recursion in a pure business-logic algorithm",
            "A memory leak causing the stack to grow indefinitely",
            "Too many concurrent threads sharing the same stack",
        ],
    },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(section) {
    const pool =
        section === "annotations"
            ? ANNOTATIONS
            : section === "errors"
                ? ERRORS
                : [...ANNOTATIONS, ...ERRORS];

    return shuffle(pool).map((item) => {
        const choices = shuffle([item.a, ...item.distractors.slice(0, 3)]);
        return {
            ...item,
            choices,
            correctIndex: choices.indexOf(item.a),
            type: ANNOTATIONS.includes(item) ? "annotation" : "error",
        };
    });
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const S = {
    wrap: {
        fontFamily: "'DM Mono', 'Fira Code', monospace",
        maxWidth: 680,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        color: "#1a1a1a",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
        gap: 10,
    },
    title: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" },
    tabs: { display: "flex", gap: 6 },
    tab: (active, color) => ({
        padding: "6px 16px",
        borderRadius: 8,
        border: `1.5px solid ${active ? color : "#ddd"}`,
        fontSize: 13,
        cursor: "pointer",
        background: active ? color : "transparent",
        color: active ? "#fff" : "#555",
        fontFamily: "inherit",
        fontWeight: active ? 700 : 400,
        transition: "all .15s",
    }),
    progressWrap: {
        width: "100%",
        height: 5,
        background: "#eee",
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: "1rem",
    },
    progressFill: (pct, color) => ({
        height: "100%",
        width: `${pct}%`,
        background: color,
        borderRadius: 5,
        transition: "width .3s",
    }),
    meta: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "#888",
        marginBottom: "1rem",
        fontFamily: "inherit",
    },
    card: {
        background: "#fff",
        border: "1.5px solid #e8e8e8",
        borderRadius: 14,
        padding: "1.25rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    },
    categoryPill: (color) => ({
        display: "inline-block",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 20,
        background: color + "22",
        color: color,
        marginBottom: 10,
        letterSpacing: "0.04em",
        fontFamily: "inherit",
    }),
    qName: {
        fontSize: 12,
        color: "#aaa",
        fontFamily: "inherit",
        marginBottom: 6,
    },
    qText: {
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1.55,
        marginBottom: "1.25rem",
        color: "#1a1a1a",
        fontFamily: "inherit",
    },
    choiceBase: {
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "10px 14px",
        borderRadius: 9,
        border: "1.5px solid #e0e0e0",
        fontSize: 13.5,
        cursor: "pointer",
        background: "#fafafa",
        color: "#1a1a1a",
        fontFamily: "inherit",
        lineHeight: 1.45,
        marginBottom: 8,
        transition: "all .12s",
    },
    choiceCorrect: {
        background: "#edfaf2",
        borderColor: "#2ecc71",
        color: "#1a5c36",
    },
    choiceWrong: {
        background: "#fdf0f0",
        borderColor: "#e74c3c",
        color: "#7a1515",
    },
    choiceReveal: {
        background: "#eef4ff",
        borderColor: "#3b82f6",
        color: "#1e3a8a",
    },
    feedback: (correct) => ({
        marginTop: "1rem",
        padding: "10px 14px",
        borderRadius: 9,
        fontSize: 13,
        lineHeight: 1.5,
        background: correct ? "#edfaf2" : "#fdf0f0",
        border: `1px solid ${correct ? "#2ecc71" : "#e74c3c"}`,
        color: correct ? "#1a5c36" : "#7a1515",
        fontFamily: "inherit",
    }),
    btnRow: {
        display: "flex",
        gap: 8,
        marginTop: "1rem",
        flexWrap: "wrap",
    },
    btn: (primary, color = "#3b82f6") => ({
        padding: "8px 22px",
        borderRadius: 9,
        border: `1.5px solid ${primary ? color : "#ddd"}`,
        fontSize: 13.5,
        cursor: "pointer",
        background: primary ? color : "transparent",
        color: primary ? "#fff" : "#555",
        fontFamily: "inherit",
        fontWeight: primary ? 700 : 400,
        transition: "all .12s",
    }),
    scoreboard: { textAlign: "center", padding: "2rem 1rem" },
    scoreBig: (color) => ({
        fontSize: 64,
        fontWeight: 700,
        color,
        lineHeight: 1,
        fontFamily: "inherit",
    }),
    scoreSub: { fontSize: 15, color: "#888", margin: "0.5rem 0 1.5rem", fontFamily: "inherit" },
    scoreGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        maxWidth: 280,
        margin: "0 auto 1.5rem",
    },
    scoreCard: {
        background: "#f7f7f7",
        borderRadius: 10,
        padding: "0.75rem",
        fontSize: 12,
        color: "#888",
        fontFamily: "inherit",
    },
    scoreCardNum: { fontSize: 26, fontWeight: 700, color: "#1a1a1a", display: "block", marginBottom: 2, fontFamily: "inherit" },
};

// ─── COLOR MAP ────────────────────────────────────────────────────────────────

const CAT_COLORS = {
    "App Bootstrap":       "#7c3aed",
    "Dependency Injection":"#0891b2",
    "Configuration":       "#d97706",
    "Web / REST":          "#16a34a",
    "Data / JPA":          "#dc2626",
    "Validation":          "#db2777",
    "Testing":             "#7c3aed",
    "Scheduling / Async":  "#ea580c",
    "Security":            "#b91c1c",
    "Startup Errors":      "#dc2626",
    "Context / Wiring":    "#d97706",
    "Web / HTTP":          "#2563eb",
    "Dependency Issues":   "#7c3aed",
};

const SECTION_COLORS = { all: "#1a1a1a", annotations: "#2563eb", errors: "#dc2626" };

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function SpringBootQuiz() {
    const [section, setSection] = useState("all");
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [done, setDone] = useState(false);

    const start = useCallback((sec) => {
        setSection(sec);
        setQuestions(buildQuestions(sec));
        setCurrent(0);
        setScore(0);
        setSelected(null);
        setDone(false);
    }, []);

    useEffect(() => { start("all"); }, [start]);

    const pick = (idx) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === questions[current].correctIndex) setScore((s) => s + 1);
    };

    const next = () => {
        if (current + 1 >= questions.length) { setDone(true); return; }
        setCurrent((c) => c + 1);
        setSelected(null);
    };

    const q = questions[current];
    const pct = questions.length ? Math.round((current / questions.length) * 100) : 0;
    const color = SECTION_COLORS[section];

    if (!questions.length) return <div style={S.wrap}>Loading…</div>;

    return (
        <div style={S.wrap}>
            {/* Header */}
            <div style={S.header}>
                <div style={S.title}>Spring Boot Quiz</div>
                <div style={S.tabs}>
                    {["all", "annotations", "errors"].map((sec) => (
                        <button
                            key={sec}
                            style={S.tab(section === sec, SECTION_COLORS[sec])}
                            onClick={() => start(sec)}
                        >
                            {sec === "all" ? "All" : sec === "annotations" ? "Annotations" : "Errors"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scoreboard */}
            {done ? (
                <div style={S.card}>
                    <div style={S.scoreboard}>
                        <div style={S.scoreBig(score / questions.length >= 0.7 ? "#16a34a" : "#dc2626")}>
                            {Math.round((score / questions.length) * 100)}%
                        </div>
                        <div style={S.scoreSub}>
                            {score / questions.length >= 0.9
                                ? "Outstanding! You nailed it."
                                : score / questions.length >= 0.7
                                    ? "Great work — almost mastered it!"
                                    : score / questions.length >= 0.5
                                        ? "Good effort — keep reviewing."
                                        : "Keep practicing — you'll get there!"}
                        </div>
                        <div style={S.scoreGrid}>
                            <div style={S.scoreCard}><span style={S.scoreCardNum}>{score}</span>Correct</div>
                            <div style={S.scoreCard}><span style={S.scoreCardNum}>{questions.length - score}</span>Missed</div>
                            <div style={S.scoreCard}><span style={S.scoreCardNum}>{questions.length}</span>Total Qs</div>
                            <div style={S.scoreCard}><span style={S.scoreCardNum}>{Math.round((score / questions.length) * 100)}%</span>Score</div>
                        </div>
                        <div style={{ ...S.btnRow, justifyContent: "center" }}>
                            <button style={S.btn(true, color)} onClick={() => start(section)}>Shuffle & Retry</button>
                            <button style={S.btn(false)} onClick={() => start("all")}>Try All Sections</button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Progress */}
                    <div style={S.progressWrap}>
                        <div style={S.progressFill(pct, color)} />
                    </div>
                    <div style={S.meta}>
                        <span>Question {current + 1} of {questions.length}</span>
                        <span>Score: {score} / {current}</span>
                    </div>

                    {/* Question card */}
                    <div style={S.card}>
                        <div>
                            <span style={S.categoryPill(CAT_COLORS[q.category] || "#555")}>{q.category}</span>
                            {q.name && <div style={S.qName}>{q.name}</div>}
                        </div>
                        <div style={S.qText}>{q.q}</div>

                        {/* Choices */}
                        <div>
                            {q.choices.map((choice, i) => {
                                let extra = {};
                                if (selected !== null) {
                                    if (i === q.correctIndex) extra = S.choiceCorrect;
                                    else if (i === selected) extra = S.choiceWrong;
                                    else extra = { opacity: 0.45 };
                                }
                                return (
                                    <button
                                        key={i}
                                        style={{ ...S.choiceBase, ...extra }}
                                        onClick={() => pick(i)}
                                        disabled={selected !== null}
                                    >
                    <span style={{ opacity: 0.4, marginRight: 8 }}>
                      {["A", "B", "C", "D"][i]}.
                    </span>
                                        {choice}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback */}
                        {selected !== null && (
                            <div style={S.feedback(selected === q.correctIndex)}>
                                <strong>{selected === q.correctIndex ? "Correct! " : "Not quite. "}</strong>
                                {q.a}
                            </div>
                        )}

                        {/* Next button */}
                        {selected !== null && (
                            <div style={S.btnRow}>
                                <button style={S.btn(true, color)} onClick={next}>
                                    {current + 1 >= questions.length ? "See Results" : "Next →"}
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}