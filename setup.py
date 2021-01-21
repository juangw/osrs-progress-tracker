import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="osrs-progress-tracker",
    version="0.0.1",
    author="juangw",
    author_email="juangw@umich.edu",
    description="Package to track an OSRS player's progress",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/juangw/osrs-progress-tracker",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.8',
)