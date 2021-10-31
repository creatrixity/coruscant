## About

The components directory houses mainly business-logic agnostic components.

To keep the application decoupled from any particular UI libraries (such as Chakra UI), any component we import from 3rd parties must have a corresponding local component (in this directory) which will maintain a similar API surface to the 3rd party component of interest.

## Why do we do this

Over the lifetime of this application, we may wish to move to a custom design system and defining a rigid API surface from the get-go will help ease any transitions.
